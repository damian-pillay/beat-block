using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<ProjectResponse> GetAllProjects(Guid userId);
        Task<ProjectResponse> CreateProjectAsync(CreateProjectRequest projectDto, Guid userId);
        Task<ProjectResponse?> GetProjectByIdAsync(int id, Guid userId);
        Task<bool> DeleteProjectAsync(int id, Guid userId);
        Task<ProjectResponse?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto, Guid userId);
        Task<FileDownloadResponse?> GetProjectFileStreamAsync(int id, string fileType, FrozenDictionary<string, string> ContentTypes, string DefaultContentType);
    }
}
