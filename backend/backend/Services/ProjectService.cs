using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
using BeatBlock.Repositories;

namespace BeatBlock.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly IBlobStorageService _blobStorageService;

    private const string ProjectFilesDir = "project-files";
    private const string ProjectAudioDir = "project-audio";
    private const string ProjectArtworkDir = "project-images";

    private const string CompressedFileType = "files";
    private const string AudioFileType = "audio";
    private const string ImageFileType = "image";

    public ProjectService(IProjectRepository repository, IBlobStorageService blobStorageService)
    {
        _repository = repository;
        _blobStorageService = blobStorageService;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _repository.GetAllProjects();
    }

    public async Task<Project> CreateProjectAsync(CreateProjectRequest projectDto)
    {
        var zipPath = await _blobStorageService.UploadAsync(projectDto.ZipFile, ProjectFilesDir);
        var mp3Path = projectDto.Mp3File != null ? await _blobStorageService.UploadAsync(projectDto.Mp3File, ProjectAudioDir) : null;
        var imagePath = projectDto.CoverImage != null ? await _blobStorageService.UploadAsync(projectDto.CoverImage, ProjectArtworkDir) : null;

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

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        var project = await _repository.GetByIdAsync(id);

        if (project == null)
        {
            return false;
        }

        await _blobStorageService.DeleteAsync(project.FilesUrl);

        if (!string.IsNullOrEmpty(project.AudioUrl))
        {
            await _blobStorageService.DeleteAsync(project.AudioUrl);
        }

        if (!string.IsNullOrEmpty(project.ArtworkUrl))
        {
            await _blobStorageService.DeleteAsync(project.ArtworkUrl);
        }

        await _repository.DeleteProject(project);

        return true;
    }

    public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto)
    {
        var project = await _repository.GetByIdAsync(id);

        if (project == null)
        {
            return null;
        }

        UpdateBasicProjectData(project, projectDto);
        await UpdateFileProjectData(project, projectDto);

        await _repository.UpdateProjectAsync(project);
        return project;
    }

    public async Task<FileDownloadResponse?> GetProjectFileStreamAsync(int id, string fileType, FrozenDictionary<string, string> ContentTypes)
    {
        var blobPath = fileType switch
        {
            CompressedFileType => await _repository.GetZipFilePathAsync(id),
            AudioFileType => await _repository.GetAudioFilePathAsync(id),
            ImageFileType => await _repository.GetImageFilePathAsync(id),
            _ => null
        };

        if (string.IsNullOrEmpty(blobPath))
        {
            return null;
        }

        var (container, blobName) = _blobStorageService.ParseBlobPath(blobPath);
        var stream = await _blobStorageService.GetBlobStreamAsync(blobPath);

        if (stream == null)
        {
            return null;
        }

        var extension = blobName.Split(".")[1];
        Console.WriteLine(extension);
        var contentType = ContentTypes.GetValueOrDefault(extension, "application/octet-stream");
        Console.WriteLine(contentType);

        return new FileDownloadResponse
        {
            FileStream = stream,
            FileName = blobName,
            ContentType = contentType
        };
    }

    private void UpdateBasicProjectData(Project project, UpdateProjectRequest projectDto)
    {
        if (!string.IsNullOrEmpty(projectDto.Name))
        {
            project.Name = projectDto.Name;
        }

        if (!string.IsNullOrEmpty(projectDto.Description))
        {
            project.Description = projectDto.Description;
        }

        if (!string.IsNullOrEmpty(projectDto.Daw))
        {
            project.Daw = projectDto.Daw;
        }

        if (!string.IsNullOrEmpty(projectDto.Genre))
        {
            project.Genre = projectDto.Genre;
        }

        if (projectDto.Bpm.HasValue)
        {
            project.Bpm = projectDto.Bpm.Value;
        }

        if (!string.IsNullOrEmpty(projectDto.KeySignature))
        {
            project.KeySignature = projectDto.KeySignature;
        }
    }

    private async Task UpdateFileProjectData(Project project, UpdateProjectRequest projectDto)
    {
        if (projectDto.ZipFile != null)
        {
            var newFilesUrl = await _blobStorageService.UploadAsync(projectDto.ZipFile, ProjectFilesDir);
            await _blobStorageService.DeleteAsync(project.FilesUrl);
            project.FilesUrl = newFilesUrl;
        }

        if (projectDto.Mp3File != null)
        {
            var newAudioUrl = await _blobStorageService.UploadAsync(projectDto.Mp3File, ProjectAudioDir);

            if (!string.IsNullOrEmpty(project.AudioUrl))
                await _blobStorageService.DeleteAsync(project.AudioUrl);

            project.AudioUrl = newAudioUrl;
        }

        if (projectDto.CoverImage != null)
        {
            var newArtworkUrl = await _blobStorageService.UploadAsync(projectDto.CoverImage, ProjectArtworkDir);

            if (!string.IsNullOrEmpty(project.ArtworkUrl))
                await _blobStorageService.DeleteAsync(project.ArtworkUrl);

            project.ArtworkUrl = newArtworkUrl;
        }
    }
}
