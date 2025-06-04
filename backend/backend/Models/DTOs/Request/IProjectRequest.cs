namespace BeatBlock.Models.DTOs.Request;

public interface IProjectRequest
{
    string? Name { get; }
    string? Description { get; }
    string? KeySignature { get; }
    byte? Bpm { get; }
    string? Genre { get; }
    string? Daw { get; }
    IFormFile? CompressedFile { get; }
    IFormFile? AudioFile { get; }
    IFormFile? ImageFile { get; }
}
