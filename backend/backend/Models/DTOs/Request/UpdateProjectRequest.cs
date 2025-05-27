namespace BeatBlock.Models.DTOs.Request;

public record UpdateProjectRequest
{
    public string? Name { get; init; }
    public string? Description { get; init; }
    public string? KeySignature { get; init; }
    public byte? Bpm { get; init; }
    public string? Genre { get; init; }
    public string? Daw { get; init; }
    public IFormFile? ZipFile { get; init; }
    public IFormFile? Mp3File { get; init; }
    public IFormFile? CoverImage { get; init; }
}