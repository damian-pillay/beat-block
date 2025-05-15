using BeatBlock.Data;
using BeatBlock.Models;

namespace BeatBlock.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _context.Projects.ToList();
    }
}
