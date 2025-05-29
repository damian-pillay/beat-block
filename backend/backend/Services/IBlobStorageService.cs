namespace BeatBlock.Services;

public interface IBlobStorageService
{
    Task<string> UploadAsync(IFormFile file, string containerName);
    Task DeleteAsync(string blobName, string containerName);
    Task<Stream?> GetBlobStreamAsync(string blobPath, string containerName);
}
