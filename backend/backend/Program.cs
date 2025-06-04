using BeatBlock.Data;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Azure.Storage.Blobs;
using Scalar.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using BeatBlock.Services.Validators;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Logs;
using BeatBlock.Middleware;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var sqlPassword = Environment.GetEnvironmentVariable("SQL_PASSWORD");
var sqlServer = Environment.GetEnvironmentVariable("SQL_SERVER");
var sqlPort = Environment.GetEnvironmentVariable("SQL_PORT");
var sqlDb = Environment.GetEnvironmentVariable("SQL_DB");

var dbConnectionString = $"Server={sqlServer},{sqlPort};Database={sqlDb};User Id=sa;Password={sqlPassword};TrustServerCertificate=True;";
var blobStorageConnectionString = Environment.GetEnvironmentVariable("AZURITE_CONNECTION_STRING");

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(dbConnectionString));

builder.Services.AddSingleton(new BlobServiceClient(blobStorageConnectionString));

const string serviceName = "beat-block-logger";

builder.Logging
    .ClearProviders()
    .AddOpenTelemetry(options =>
{
    options
        .SetResourceBuilder(
            ResourceBuilder.CreateDefault()
                .AddService(serviceName))
        .AddConsoleExporter();
});
builder.Services.AddOpenTelemetry()
      .ConfigureResource(resource => resource.AddService(serviceName));

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = null;
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectUploadValidator, ProjectUploadValidator>();
builder.Services.AddScoped<IBlobStorageRepository, BlobStorageRepository>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseExceptionHandler(_ => { });
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
