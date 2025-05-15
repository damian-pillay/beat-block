using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;

    public ProjectService(IProjectRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _repository.GetAllProjects();
    }
}
