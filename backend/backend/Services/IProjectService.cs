using BeatBlock.DTOs;
using BeatBlock.Models;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetAllProjects();
        Task<Project> CreateProjectAsync(ProjectDTO projectDto);
        Task<Project?> GetProjectByIdAsync(int id);
    }
}
