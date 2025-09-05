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

    public IEnumerable<Project> GetAllProjects(Guid userId)
    {
        _logger.LogInformation("Retrieving all projects.");

        var userProjects = _context.Project.Where(p  => p.UserId == userId).ToList();

        return userProjects;
    }

    public async Task AddAsync(Project project)
    {
        _logger.LogInformation("Adding new project: {@Project}", project);
        _context.Project.Add(project);

        await _context.SaveChangesAsync();
        _logger.LogInformation("Project added with Id {ProjectId}", project.Id);
    }

    public async Task<Project?> GetByIdAsync(int id, Guid userId)
    {
        _logger.LogInformation("Fetching project by ID: {ProjectId} for user {UserId}", id, userId);

        var project = await _context.Project
            .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

        if (project == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found or does not belong to user {UserId}.", id, userId);
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

    public async Task UpdateProjectAsync(Project updatedProject)
    {
        var project = _context.Project.First(x => x.Id == updatedProject.Id);

        project.Name = updatedProject.Name;
        project.Description = updatedProject.Description;
        project.KeySignature = updatedProject.KeySignature;
        project.Bpm = updatedProject.Bpm;
        project.Genre = updatedProject.Genre;
        project.Daw = updatedProject.Daw;
        project.FilePath = updatedProject.FilePath;
        project.AudioPath = updatedProject.AudioPath;
        project.ImagePath = updatedProject.ImagePath;
        project.UpdatedAt = updatedProject.UpdatedAt;

        await _context.SaveChangesAsync();
    }

    public async Task<string?> GetImageFilePathAsync(int projectId, Guid userId)
    {
        _logger.LogInformation("Fetching image path for Project ID: {ProjectId}", projectId);

        var imagePath = await _context.Project
            .Where(p => p.Id == projectId && p.UserId == userId)
            .Select(p => p.ImagePath)
            .FirstOrDefaultAsync();

        if (imagePath == null)
        {
            _logger.LogWarning("No image path found for Project ID: {ProjectId}", projectId);
        }

        return imagePath;
    }

    public async Task<string?> GetCompressedFilePathAsync(int projectId, Guid userId)
    {
        _logger.LogInformation("Fetching compressed file path for Project ID: {ProjectId}", projectId);

        var filePath = await _context.Project
            .Where(p => p.Id == projectId && p.UserId == userId)
            .Select(p => p.FilePath)
            .FirstOrDefaultAsync();

        if (filePath == null)
        {
            _logger.LogWarning("No compressed file path found for Project ID: {ProjectId}", projectId);
        }

        return filePath;
    }

    public async Task<string?> GetAudioFilePathAsync(int projectId, Guid userId)
    {
        _logger.LogInformation("Fetching audio path for Project ID: {ProjectId}", projectId);

        var audioPath = await _context.Project
            .Where(p => p.Id == projectId && p.UserId == userId)
            .Select(p => p.AudioPath)
            .FirstOrDefaultAsync();

        if (audioPath == null)
        {
            _logger.LogWarning("No audio path found for Project ID: {ProjectId}", projectId);
        }

        return audioPath;
    }
}
