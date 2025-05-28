
using Azure.Storage.Blobs;

namespace BeatBlock.Services;

public class BlobStorageService : IBlobStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public BlobStorageService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    public async Task DeleteAsync(string blobPath)
    {
        var (containerName, blobName) = ParseBlobPath(blobPath);

        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        var blobClient = containerClient.GetBlobClient(blobName);

        await blobClient.DeleteIfExistsAsync();
    }

    public async Task<string> UploadAsync(IFormFile file, string containerName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        await containerClient.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

        var blobName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var blobClient = containerClient.GetBlobClient(blobName);

        using var stream = file.OpenReadStream();
        await blobClient.UploadAsync(stream);

        return blobClient.Uri.ToString();
    }

    private (string, string) ParseBlobPath(string blobPath)
    {
        var uri = new Uri(blobPath);
        var segments = uri.AbsolutePath.TrimStart('/').Split('/', 3);

        var containerName = segments[1];
        var blobName = segments[2];

        return (containerName, blobName);
    }
}
