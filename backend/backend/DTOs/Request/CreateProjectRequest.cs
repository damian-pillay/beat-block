using System.ComponentModel.DataAnnotations;

namespace BeatBlock.DTOs.Request;

public class CreateProjectRequest
{
    [Required]
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? KeySignature { get; set; }
    public byte? Bpm { get; set; }
    public string? Genre { get; set; }
    
    [Required]
    public string Daw { get; set; } = null!;

    [Required]
    public IFormFile ZipFile { get; set; } = null!;
    public IFormFile? Mp3File { get; set; }
    public IFormFile? CoverImage { get; set; }
}
