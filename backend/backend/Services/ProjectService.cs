using BeatBlock.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using Azure.Storage.Blobs;
using System.ComponentModel;
using System.Reflection.Metadata;

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

        await containerClient.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

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

    public async Task<bool> DeleteProjectAsync(int id)
    {
        var project = await _repository.GetByIdAsync(id);
        if (project == null)
            return false;

        await DeleteBlobAsync(project.FilesUrl);
        
        if (!string.IsNullOrEmpty(project.AudioUrl))
            await DeleteBlobAsync(project.AudioUrl);

        if (!string.IsNullOrEmpty(project.ArtworkUrl))
            await DeleteBlobAsync(project.ArtworkUrl);

        await _repository.DeleteProject(project);

        return true;
    }

    private async Task DeleteBlobAsync(string blobPath)
    {
        var (containerName, blobName) = ParseBlobPath(blobPath);
        Console.WriteLine($"Deleting blob: container = {containerName}, blob = {blobName}");

        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        await containerClient.CreateIfNotExistsAsync();

        var blobClient = containerClient.GetBlobClient(blobName);

        await blobClient.DeleteIfExistsAsync();
    }

    public (string, string) ParseBlobPath(string blobPath)
    {
        var uri = new Uri(blobPath);
        var segments = uri.AbsolutePath.TrimStart('/').Split('/', 3);

        var containerName = segments[1];
        var blobName = segments[2];

        return (containerName, blobName);
    }
}
