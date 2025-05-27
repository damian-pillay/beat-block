using Microsoft.AspNetCore.Http;
using System.Text;

public static class FormFileHelper
{
    public static IFormFile CreateFakeFormFile(string content, string fileName = "file.txt", string contentType = "application/octet-stream")
    {
        var stream = new MemoryStream(Encoding.UTF8.GetBytes(content));
        return new FormFile(stream, 0, stream.Length, "file", fileName)
        {
            Headers = new HeaderDictionary(),
            ContentType = contentType
        };
    }
}
