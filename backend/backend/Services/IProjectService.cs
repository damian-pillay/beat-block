using backend.Models;

namespace backend.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> GetAllProjects();
    }
}
