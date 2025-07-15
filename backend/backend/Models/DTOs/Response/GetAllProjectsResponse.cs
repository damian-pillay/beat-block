using BeatBlock.Models;

namespace BeatBlock.Models.DTOs.Response
{
    public record GetAllProjectsResponse(IEnumerable<ProjectResponse> Projects);
}
