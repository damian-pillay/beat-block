namespace BeatBlock.Helpers;

public static class ContentTypeHelper
{
    private static readonly Dictionary<string, string> ContentTypes = new()
    {
        { "zip", "application/zip" },
        { "rar", "application/vnd.rar" },
        { "mp3", "audio/mpeg" },
        { "jpg", "image/jpeg" },
        { "jpeg", "image/jpeg" },
        { "png", "image/png" }
    };

    public static string GetContentType(string? fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
            return "application/octet-stream";

        var extension = fileName.TrimStart('.').ToLowerInvariant();
        return ContentTypes.TryGetValue(extension, out var type)
            ? type
            : "application/octet-stream";
    }
}