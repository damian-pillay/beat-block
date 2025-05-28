using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetAllProjects();
        Task<Project> CreateProjectAsync(CreateProjectRequest projectDto);
        Task<Project?> GetProjectByIdAsync(int id);
        Task<bool> DeleteProjectAsync(int id);
        Task<Project?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto);
        Task<FileDownloadResponse?> GetProjectFileStreamAsync(int id, string fileType, FrozenDictionary<string, string> ContentTypes);
    }
}
