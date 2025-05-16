using BeatBlock.Models;

namespace BeatBlock.DTOs
{
    public record GetAllProjectsRequest(IEnumerable<Project> Projects);
}
