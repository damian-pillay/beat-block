using BeatBlock.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using Azure.Storage.Blobs;

namespace BeatBlock.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly BlobServiceClient _blobServiceClient;

    private const string ProjectFilesDir = "project-files";
    private const string ProjectAudioDir = "project-audio";
    private const string ProjectArtworkDir = "project-files";

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
        var zipPath = await UploadBlobAsync(projectDto.ZipFile, ProjectFilesDir);
        var mp3Path = projectDto.Mp3File != null ? await UploadBlobAsync(projectDto.Mp3File, ProjectAudioDir) : null;
        var imagePath = projectDto.CoverImage != null ? await UploadBlobAsync(projectDto.CoverImage, ProjectArtworkDir) : null;

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

    private async Task<string> UploadBlobAsync(IFormFile file, string containerName)
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

    public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto)
    {
        var project = await _repository.GetByIdAsync(id);
        if (project == null)
            return null;

        if (!string.IsNullOrEmpty(projectDto.Name)) project.Name = projectDto.Name;
        if (!string.IsNullOrEmpty(projectDto.Description)) project.Description = projectDto.Description;

        if (projectDto.ZipFile != null)
        {
            var newFilesUrl = await UploadBlobAsync(projectDto.ZipFile, ProjectFilesDir);
            await DeleteBlobAsync(project.FilesUrl);
            project.FilesUrl = newFilesUrl;
        }

        if (projectDto.Mp3File != null)
        {
            var newAudioUrl = await UploadBlobAsync(projectDto.Mp3File, ProjectAudioDir);

            if (!string.IsNullOrEmpty(project.AudioUrl))
                await DeleteBlobAsync(project.AudioUrl);

            project.AudioUrl = newAudioUrl;
        }

        if (projectDto.CoverImage != null)
        {
            var newArtworkUrl = await UploadBlobAsync(projectDto.CoverImage, ProjectArtworkDir);

            if (!string.IsNullOrEmpty(project.ArtworkUrl))
                await DeleteBlobAsync(project.ArtworkUrl);

            project.ArtworkUrl = newArtworkUrl;
        }

        await _repository.UpdateProjectAsync(project);
        return project;
    }
}
