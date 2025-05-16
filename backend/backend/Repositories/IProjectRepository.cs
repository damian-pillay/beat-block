using BeatBlock.Models;

namespace BeatBlock.Repositories;

public interface IProjectRepository
{
    IEnumerable<Project> GetAllProjects();
}
