using BeatBlock.Data;
using BeatBlock.Models;
using Microsoft.EntityFrameworkCore;

namespace BeatBlock.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;
    private readonly ILogger<ProjectRepository> _logger;

    public ProjectRepository(AppDbContext context, ILogger<ProjectRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        _logger.LogInformation("Retrieving all projects.");
        return _context.Project.ToList();
    }

    public async Task AddAsync(Project project)
    {
        _logger.LogInformation("Adding new project: {@Project}", project);
        _context.Project.Add(project);

        await _context.SaveChangesAsync();
        _logger.LogInformation("Project added with Id {ProjectId}", project.Id);
    }

    public async Task<Project?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Fetching project by ID: {ProjectId}", id);
        var project = await _context.Project.FindAsync(id);

        if (project == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found.", id);
        }

        return project;
    }

    public async Task DeleteProject(Project project)
    {
        _logger.LogInformation("Deleting project with ID: {ProjectId}", project.Id);
        _context.Project.Remove(project);

        await _context.SaveChangesAsync();
        _logger.LogInformation("Project with ID {ProjectId} deleted successfully.", project.Id);
    }

    public async Task UpdateProjectAsync(Project project)
    {
        _context.Project.Update(project);
        await _context.SaveChangesAsync();
    }

    public async Task<string?> GetImageFilePathAsync(int projectId)
    {
        _logger.LogInformation("Fetching image path for Project ID: {ProjectId}", projectId);

        var imagePath = await _context.Project
            .Where(p => p.Id == projectId)
            .Select(p => p.ImagePath)
            .FirstOrDefaultAsync();

        if (imagePath == null)
        {
            _logger.LogWarning("No image path found for Project ID: {ProjectId}", projectId);
        }

        return imagePath;
    }

    public async Task<string?> GetCompressedFilePathAsync(int projectId)
    {
        _logger.LogInformation("Fetching compressed file path for Project ID: {ProjectId}", projectId);

        var filePath = await _context.Project
            .Where(p => p.Id == projectId)
            .Select(p => p.FilePath)
            .FirstOrDefaultAsync();

        if (filePath == null)
        {
            _logger.LogWarning("No compressed file path found for Project ID: {ProjectId}", projectId);
        }

        return filePath;
    }

    public async Task<string?> GetAudioFilePathAsync(int projectId)
    {
        _logger.LogInformation("Fetching audio path for Project ID: {ProjectId}", projectId);

        var audioPath = await _context.Project
            .Where(p => p.Id == projectId)
            .Select(p => p.AudioPath)
            .FirstOrDefaultAsync();

        if (audioPath == null)
        {
            _logger.LogWarning("No audio path found for Project ID: {ProjectId}", projectId);
        }

        return audioPath;
    }
}
