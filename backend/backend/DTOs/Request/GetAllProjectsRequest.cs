using BeatBlock.Models;

namespace BeatBlock.DTOs.Request
{
    public record GetAllProjectsRequest(IEnumerable<Project> Projects);
}
