namespace BeatBlock.Models.DTOs.Response;

public record FileDownloadResponse
{
    public Stream FileStream { get; init; } = null!;
    public string FileName { get; init; } = null!;
    public string ContentType { get; init; } = null!;
}
