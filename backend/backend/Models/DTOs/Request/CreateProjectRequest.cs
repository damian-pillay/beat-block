using System.ComponentModel.DataAnnotations;

namespace BeatBlock.Models.DTOs.Request;

public record CreateProjectRequest : IProjectRequest
{
    [Required]
    public string Name { get; init; } = null!;

    public string? Description { get; init; }

    public string? KeySignature { get; init; }

    public byte? Bpm { get; init; }

    public string? Genre { get; init; }

    [Required]
    public string Daw { get; init; } = null!;

    [Required]
    public IFormFile CompressedFile { get; init; } = null!;

    public IFormFile? AudioFile { get; init; }

    public IFormFile? ImageFile { get; init; }
}
