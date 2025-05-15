using backend.Data;
using backend.Models;

namespace backend.Repositories;

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
