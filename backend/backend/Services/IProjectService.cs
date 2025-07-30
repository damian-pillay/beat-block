using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectResponse> GetAllProjects();
        Task<ProjectResponse> CreateProjectAsync(CreateProjectRequest projectDto, Guid userId);
        Task<ProjectResponse?> GetProjectByIdAsync(int id);
        Task<bool> DeleteProjectAsync(int id);
        Task<ProjectResponse?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto);
        Task<FileDownloadResponse?> GetProjectFileStreamAsync(int id, string fileType, FrozenDictionary<string, string> ContentTypes, string DefaultContentType);
    }
}
