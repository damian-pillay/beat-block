using backend.Models;

namespace backend.Repositories;

public interface IProjectRepository
{
    IEnumerable<Project> GetAllProjects();
}
