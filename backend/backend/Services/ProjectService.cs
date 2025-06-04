using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
using BeatBlock.Repositories;

namespace BeatBlock.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly IBlobStorageRepository _blobStorageService;
    private readonly ILogger<IProjectService> _logger;

    private const string ProjectFilesDir = "project-files";
    private const string ProjectAudioDir = "project-audio";
    private const string ProjectImageDir = "project-images";

    private const string CompressedFileType = "files";
    private const string AudioFileType = "audio";
    private const string ImageFileType = "image";

    public ProjectService(IProjectRepository repository, IBlobStorageRepository blobStorageService, ILogger<IProjectService> logger)
    {
        _repository = repository;
        _blobStorageService = blobStorageService;
        _logger = logger;
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _repository.GetAllProjects();
    }

    public async Task<Project> CreateProjectAsync(CreateProjectRequest projectDto)
    {
        _logger.LogInformation("Creating project: {ProjectName}", projectDto.Name);

        var filePath = await _blobStorageService.UploadAsync(projectDto.CompressedFile, ProjectFilesDir);
        _logger.LogDebug("Compressed project file uploaded to {FilePath}", filePath);

        string? audioPath = null;
        if (projectDto.AudioFile != null)
        {
            audioPath = await _blobStorageService.UploadAsync(projectDto.AudioFile, ProjectAudioDir);
            _logger.LogDebug("Audio file uploaded to {AudioPath}", audioPath);
        }

        string? imagePath = null;
        if (projectDto.ImageFile != null)
        {
            imagePath = await _blobStorageService.UploadAsync(projectDto.ImageFile, ProjectImageDir);
            _logger.LogDebug("Image file uploaded to {ImagePath}", imagePath);
        }

        _logger.LogInformation("All project files for '{ProjectName}' uploaded successfully.", projectDto.Name);

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
        _logger.LogInformation("Fetching project with Id: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id);

        if (project == null)
        {
            _logger.LogWarning("No project found with Id: {ProjectId}", id);
        }

        return project;
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        _logger.LogInformation("Attempting to delete project with Id: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id);

        if (project == null)
        {
            _logger.LogWarning("Project with Id: {ProjectId} not found. Deletion aborted.", id);
            return false;
        }

        await _blobStorageService.DeleteAsync(project.FilePath, ProjectFilesDir);
        _logger.LogDebug("Deleted compressed file at {FilePath}", project.FilePath);

        if (!string.IsNullOrEmpty(project.AudioPath))
        {
            await _blobStorageService.DeleteAsync(project.AudioPath, ProjectAudioDir);
            _logger.LogDebug("Deleted audio file at {AudioPath}", project.AudioPath);
        }

        if (!string.IsNullOrEmpty(project.ImagePath))
        {
            await _blobStorageService.DeleteAsync(project.ImagePath, ProjectImageDir);
            _logger.LogDebug("Deleted image file at {ImagePath}", project.ImagePath);
        }

        await _repository.DeleteProject(project);
        return true;
    }

    public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectRequest projectDto)
    {
        _logger.LogInformation("Attempting to update project with Id: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id);

        if (project == null)
        {
            _logger.LogWarning("Project with Id: {ProjectId} not found. Update aborted.", id);
            return null;
        }

        _logger.LogInformation("Updating basic project data for Id: {ProjectId}", id);
        UpdateBasicProjectData(project, projectDto);

        _logger.LogInformation("Updating project files for Id: {ProjectId}", id);
        await UpdateFileProjectData(project, projectDto);

        await _repository.UpdateProjectAsync(project);
        return project;
    }

    public async Task<FileDownloadResponse?> GetProjectFileStreamAsync(
        int id,
        string fileType,
        FrozenDictionary<string, string> ContentTypes,
        string DefaultContentType)
    {
        _logger.LogInformation("Attempting to retrieve {FileType} for project with Id: {ProjectId}", fileType, id);

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
            _logger.LogWarning("{FileType} blob path not found for project Id: {ProjectId}", fileType, id);
            return null;
        }

        _logger.LogDebug("Retrieving blob stream for path: {BlobPath} in container: {BlobContainer}", blobPath, blobContainer);
        var stream = await _blobStorageService.GetBlobStreamAsync(blobPath, blobContainer!);

        if (stream == null)
        {
            _logger.LogWarning("Failed to retrieve blob stream for path: {BlobPath}", blobPath);
            return null;
        }

        var extension = blobPath.Split(".")[1];
        var contentType = ContentTypes.GetValueOrDefault(extension, DefaultContentType);

        _logger.LogInformation("Successfully retrieved stream for project Id: {ProjectId}, file type: {FileType}", id, fileType);
        return new FileDownloadResponse
        {
            FileStream = stream,
            FileName = blobPath,
            ContentType = contentType
        };
    }

    private void UpdateBasicProjectData(Project project, UpdateProjectRequest projectDto)
    {
        project.Name = projectDto.Name ?? project.Name;
        project.Description = projectDto.Description ?? project.Description;
        project.KeySignature = projectDto.KeySignature ?? project.KeySignature;
        project.Daw = projectDto.Daw ?? project.Daw;
        project.Bpm = projectDto.Bpm ?? project.Bpm;
        project.Genre = projectDto.Genre ?? project.Genre;
        project.UpdatedAt = DateTime.UtcNow;
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
            {
                await _blobStorageService.DeleteAsync(project.AudioPath, ProjectAudioDir);
            }

            project.AudioPath = newAudioUrl;
        }

        if (projectDto.ImageFile != null)
        {
            var newArtworkUrl = await _blobStorageService.UploadAsync(projectDto.ImageFile, ProjectImageDir);

            if (!string.IsNullOrEmpty(project.ImagePath))
            {
                await _blobStorageService.DeleteAsync(project.ImagePath, ProjectImageDir);
            }

            project.ImagePath = newArtworkUrl;
        }
    }
}
