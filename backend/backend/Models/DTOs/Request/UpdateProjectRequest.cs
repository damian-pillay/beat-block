namespace BeatBlock.Models.DTOs.Request;

public record UpdateProjectRequest : IProjectRequest
{
    public string? Name { get; init; }
    public string? Description { get; init; }
    public string? KeySignature { get; init; }
    public byte? Bpm { get; init; }
    public string? Genre { get; init; }
    public string? Daw { get; init; }
    public IFormFile? CompressedFile { get; init; }
    public IFormFile? AudioFile { get; init; }
    public IFormFile? ImageFile { get; init; }
}