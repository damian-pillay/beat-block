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
    private const string ProjectImageDir = "project-images";

    private const string CompressedFileType = "files";
    private const string AudioFileType = "audio";
    private const string ImageFileType = "image";

    private const string DefaultContentType = "application/octet-stream";

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
        var filePath = await _blobStorageService.UploadAsync(projectDto.CompressedFile, ProjectFilesDir);
        var audioPath = projectDto.AudioFile != null ? await _blobStorageService.UploadAsync(projectDto.AudioFile, ProjectAudioDir) : null;
        var imagePath = projectDto.ImageFile != null ? await _blobStorageService.UploadAsync(projectDto.ImageFile, ProjectImageDir) : null;

        var project = new Project
        {
            Name = projectDto.Name,
            Description = projectDto.Description,
            KeySignature = projectDto.KeySignature,
            Bpm = projectDto.Bpm,
            Genre = projectDto.Genre,
            Daw = projectDto.Daw,
            FilePath = filePath,
            AudioPath = audioPath,
            ImagePath = imagePath
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

        await _blobStorageService.DeleteAsync(project.FilePath, ProjectFilesDir);

        if (!string.IsNullOrEmpty(project.AudioPath))
        {
            await _blobStorageService.DeleteAsync(project.AudioPath, ProjectAudioDir);
        }

        if (!string.IsNullOrEmpty(project.ImagePath))
        {
            await _blobStorageService.DeleteAsync(project.ImagePath, ProjectImageDir);
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
            CompressedFileType => await _repository.GetCompressedFilePathAsync(id),
            AudioFileType => await _repository.GetAudioFilePathAsync(id),
            ImageFileType => await _repository.GetImageFilePathAsync(id),
            _ => null
        };

        var blobContainer = fileType switch
        {
            CompressedFileType => ProjectFilesDir,
            AudioFileType => ProjectAudioDir,
            ImageFileType => ProjectImageDir,
            _ => null
        };

        if (string.IsNullOrEmpty(blobPath))
        {
            return null;
        }

        var stream = await _blobStorageService.GetBlobStreamAsync(blobPath, blobContainer!);

        if (stream == null)
        {
            return null;
        }

        var extension = blobPath.Split(".")[1];
        var contentType = ContentTypes.GetValueOrDefault(extension, DefaultContentType);

        return new FileDownloadResponse
        {
            FileStream = stream,
            FileName = blobPath,
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
        if (projectDto.CompressedFile != null)
        {
            var newFilesUrl = await _blobStorageService.UploadAsync(projectDto.CompressedFile, ProjectFilesDir);
            await _blobStorageService.DeleteAsync(project.FilePath, ProjectFilesDir);
            project.FilePath = newFilesUrl;
        }

        if (projectDto.AudioFile != null)
        {
            var newAudioUrl = await _blobStorageService.UploadAsync(projectDto.AudioFile, ProjectAudioDir);

            if (!string.IsNullOrEmpty(project.AudioPath))
                await _blobStorageService.DeleteAsync(project.AudioPath, ProjectAudioDir);

            project.AudioPath = newAudioUrl;
        }

        if (projectDto.ImageFile != null)
        {
            var newArtworkUrl = await _blobStorageService.UploadAsync(projectDto.ImageFile, ProjectImageDir);

            if (!string.IsNullOrEmpty(project.ImagePath))
                await _blobStorageService.DeleteAsync(project.ImagePath, ProjectImageDir);

            project.ImagePath = newArtworkUrl;
        }
    }
}
