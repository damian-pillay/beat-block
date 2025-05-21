using BeatBlock.Data;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Azure.Storage.Blobs;
using Scalar.AspNetCore;

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

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = long.MaxValue;
});

builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();

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

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
