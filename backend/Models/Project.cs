namespace backend.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string? KeySignature { get; set; }
        public byte? Bpm { get; set; }
        public string? Genre { get; set; }
        public string Daw { get; set; } = null!;
        public string FilesUrl { get; set; } = null!;
        public string? AudioUrl { get; set; }
        public string? ArtworkUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
