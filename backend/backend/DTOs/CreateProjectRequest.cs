using System.ComponentModel.DataAnnotations;

namespace BeatBlock.DTOs;

public class CreateProjectResponse
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
    public string FilesUrl { get; set; } = null!;
    public string? AudioUrl { get; set; }
    public string? ArtworkUrl { get; set; }
}
