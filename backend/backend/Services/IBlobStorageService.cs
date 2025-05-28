namespace BeatBlock.Services;

public interface IBlobStorageService
{
    Task<string> UploadAsync(IFormFile file, string containerName);
    Task DeleteAsync(string blobPath);
}
