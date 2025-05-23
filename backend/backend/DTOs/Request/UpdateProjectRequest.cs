namespace BeatBlock.DTOs.Request;

public class UpdateProjectRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? KeySignature { get; set; }
    public byte? Bpm { get; set; }
    public string? Genre { get; set; }
    public string? Daw { get; set; }
    public IFormFile? ZipFile { get; set; }
    public IFormFile? Mp3File { get; set; }
    public IFormFile? CoverImage { get; set; }
}