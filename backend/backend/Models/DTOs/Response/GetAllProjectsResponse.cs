using BeatBlock.Models;

namespace BeatBlock.DTOs.Response
{
    public record GetAllProjectsResponse(IEnumerable<Project> Projects);
}
