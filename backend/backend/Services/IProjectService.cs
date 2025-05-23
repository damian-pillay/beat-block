using BeatBlock.DTOs.Request;
using BeatBlock.Models;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetAllProjects();
        Task<Project> CreateProjectAsync(CreateProjectRequest projectDto);
        Task<Project?> GetProjectByIdAsync(int id);
        Task<bool> DeleteProjectAsync(int id);
        Task<Project?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto);
    }
}
