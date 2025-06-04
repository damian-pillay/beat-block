namespace BeatBlock.Models;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? KeySignature { get; set; }
    public byte? Bpm { get; set; }
    public string? Genre { get; set; }
    public string Daw { get; set; } = null!;
    public string FilePath { get; set; } = null!;
    public string? AudioPath { get; set; }
    public string? ImagePath { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
