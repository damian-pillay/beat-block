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
        return _context.Project.ToList();
    }

    public async Task AddAsync(Project project)
    {
        _context.Project.Add(project);
        await _context.SaveChangesAsync();
    }

    public async Task<Project?> GetByIdAsync(int id)
    {
        return await _context.Project.FindAsync(id);
    }

    public async Task DeleteProject(Project project)
    {
        _context.Project.Remove(project);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProjectAsync(Project project)
    {
        _context.Project.Update(project);
        await _context.SaveChangesAsync();
    }
}
