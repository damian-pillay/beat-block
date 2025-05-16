using BeatBlock.Models;

namespace BeatBlock.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetAllProjects();
    }
}
