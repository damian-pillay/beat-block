using BeatBlock.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using Azure.Storage.Blobs;

namespace BeatBlock.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly BlobServiceClient _blobServiceClient;

    public ProjectService(IProjectRepository repository, BlobServiceClient blobServiceClient)
    {
        _repository = repository;
        _blobServiceClient = blobServiceClient;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _repository.GetAllProjects();
    }

    public async Task<Project> CreateProjectAsync(CreateProjectRequest projectDto)
    {
        Console.WriteLine("[CreateProjectAsync] Called.");

        if (projectDto.ZipFile == null)
        {
            Console.WriteLine("[CreateProjectAsync] ZipFile is null — this is required.");
            throw new ArgumentException("ZipFile is required");
        }

        var zipPath = await UploadFileToBlobAsync(projectDto.ZipFile, "project-files");

        string? mp3Path = null;
        if (projectDto.Mp3File != null)
        {
            try
            {
                mp3Path = await UploadFileToBlobAsync(projectDto.Mp3File, "project-audio");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateProjectAsync] MP3 upload failed: {ex.Message}");
            }
        }

        string? imagePath = null;
        if (projectDto.CoverImage != null)
        {
            try
            {
                imagePath = await UploadFileToBlobAsync(projectDto.CoverImage, "project-artwork");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[CreateProjectAsync] Image upload failed: {ex.Message}");
            }
        }
        var project = new Project
        {
            Name = projectDto.Name,
            Description = projectDto.Description,
            KeySignature = projectDto.KeySignature,
            Bpm = projectDto.Bpm,
            Genre = projectDto.Genre,
            Daw = projectDto.Daw,
            FilesUrl = zipPath,
            AudioUrl = mp3Path,
            ArtworkUrl = imagePath
        };

        await _repository.AddAsync(project);
        return project;
    }

    private async Task<string> UploadFileToBlobAsync(IFormFile file, string containerName)
    {
        Console.WriteLine($"[UploadFileToBlobAsync] Start uploading '{file.FileName}' to container '{containerName}'");

        try
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();
            Console.WriteLine("[UploadFileToBlobAsync] Container ready.");

            var blobName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var blobClient = containerClient.GetBlobClient(blobName);

            await using var stream = file.OpenReadStream();
            Console.WriteLine("[UploadFileToBlobAsync] Stream opened.");

            await blobClient.UploadAsync(stream, overwrite: true);
            Console.WriteLine($"[UploadFileToBlobAsync] Upload successful. Blob URL: {blobClient.Uri}");

            return blobClient.Uri.ToString();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[UploadFileToBlobAsync] ERROR: {ex.Message}");
            throw;
        }
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
