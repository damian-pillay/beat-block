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
        var zipPath = await UploadFileToBlobAsync(projectDto.ZipFile, "project-files");
        var mp3Path = projectDto.Mp3File != null ? await UploadFileToBlobAsync(projectDto.Mp3File, "project-audio") : null;
        var imagePath = projectDto.CoverImage != null ? await UploadFileToBlobAsync(projectDto.CoverImage, "project-artwork") : null;

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
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        var blobName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var blobClient = containerClient.GetBlobClient(blobName);

        using var stream = file.OpenReadStream();
        await blobClient.UploadAsync(stream);

        return blobClient.Uri.ToString();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
