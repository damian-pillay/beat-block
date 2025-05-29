using BeatBlock.Models;

namespace BeatBlock.Repositories;

public interface IProjectRepository
{
    IEnumerable<Project> GetAllProjects();
    Task AddAsync(Project project);
    Task<Project?> GetByIdAsync(int id);
    Task DeleteProject(Project project);
    Task UpdateProjectAsync(Project project);
    Task<string?> GetImageFilePathAsync(int projectId);
    Task<string?> GetCompressedFilePathAsync(int projectId);
    Task<string?> GetAudioFilePathAsync(int projectId);
}
