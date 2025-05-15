using BeatBlock.Models;
using Microsoft.EntityFrameworkCore;

namespace BeatBlock.Data;

public class AppDbContext : DbContext
{
    public DbSet<Project> Projects { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }
}
