using System.Collections.Frozen;

namespace BeatBlock.Helpers;

public static class ContentTypeHelper
{
    public static readonly string DefaultContentType = "application/octet-stream";

    public static readonly FrozenDictionary<string, string> ContentTypes = new Dictionary<string, string>
    {
        { "zip", "application/zip" },
        { "rar", "application/vnd.rar" },
        { "mp3", "audio/mpeg" },
        { "jpg", "image/jpeg" },
        { "jpeg", "image/jpeg" },
        { "png", "image/png" }
    }.ToFrozenDictionary();
}