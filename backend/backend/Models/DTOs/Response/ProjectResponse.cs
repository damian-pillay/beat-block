namespace BeatBlock.Models.DTOs.Response
{
    public class ProjectResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? KeySignature { get; set; }
        public byte? Bpm { get; set; }
        public string? Genre { get; set; }
        public string Daw { get; set; } = null!;
        public bool HasFile { get; set; } = false;
        public bool HasAudio { get; set; } = false;
        public bool HasImage { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
