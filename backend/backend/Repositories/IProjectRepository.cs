using BeatBlock.Models;

namespace BeatBlock.Repositories;

public interface IProjectRepository
{
    IEnumerable<Project> GetAllProjects(Guid userId);
    Task AddAsync(Project project);
    Task<Project?> GetByIdAsync(int id, Guid userId);
    Task DeleteProject(Project project);
    Task UpdateProjectAsync(Project project);
    Task<string?> GetImageFilePathAsync(int projectId);
    Task<string?> GetCompressedFilePathAsync(int projectId);
    Task<string?> GetAudioFilePathAsync(int projectId);
}
