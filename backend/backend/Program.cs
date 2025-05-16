using BeatBlock.Data;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

var sqlPassword = Environment.GetEnvironmentVariable("SQL_PASSWORD");
var sqlServer = Environment.GetEnvironmentVariable("SQL_SERVER");
var sqlPort = Environment.GetEnvironmentVariable("SQL_PORT");
var sqlDb = Environment.GetEnvironmentVariable("SQL_DB");

var connectionString = $"Server={sqlServer},{sqlPort};Database={sqlDb};User Id=sa;Password={sqlPassword};TrustServerCertificate=True;";

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

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
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
