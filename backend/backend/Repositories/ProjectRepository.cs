using BeatBlock.Data;
using BeatBlock.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task<string?> GetBlobPathByTypeAsync(int projectId, string fileType)
    {
        var project = await _context.Project
            .Where(p => p.Id == projectId)
            .Select(p => new
            {
                ZipPath = p.FilesUrl,
                Mp3Path = p.AudioUrl,
                ImagePath = p.ArtworkUrl
            })
            .FirstOrDefaultAsync();

        if (project == null) return null;

        return fileType switch
        {
            "zip" => project.ZipPath,
            "mp3" => project.Mp3Path,
            "image" => project.ImagePath,
            _ => null
        };
    }
}
