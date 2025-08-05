using System.Collections.Frozen;
using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
using BeatBlock.Repositories;

namespace BeatBlock.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly IBlobStorageRepository _blobStorageRepository;
    private readonly ILogger<IProjectService> _logger;

    private const string ProjectFilesDir = "project-files";
    private const string ProjectAudioDir = "project-audio";
    private const string ProjectImageDir = "project-images";

    private const string CompressedFileType = "files";
    private const string AudioFileType = "audio";
    private const string ImageFileType = "image";

    public ProjectService(IProjectRepository repository, IBlobStorageRepository blobStorageRepository, ILogger<IProjectService> logger)
    {
        _repository = repository;
        _blobStorageRepository = blobStorageRepository;
        _logger = logger;
    }

    public IEnumerable<ProjectResponse> GetAllProjects(Guid userId)
    {
        var projects = _repository.GetAllProjects(userId);

        var projectsResponse = projects.Select(project => ConvertToProjectResponse(project));

        return projectsResponse;
    }

    public async Task<ProjectResponse> CreateProjectAsync(CreateProjectRequest projectDto, Guid userId)
    { 
        _logger.LogInformation("Creating project: {ProjectName}", projectDto.Name);

        var filePath = await _blobStorageRepository.UploadAsync(projectDto.CompressedFile, ProjectFilesDir);
        _logger.LogDebug("Compressed project file uploaded to {FilePath}", filePath);

        string? audioPath = null;
        if (projectDto.AudioFile != null)
        {
            audioPath = await _blobStorageRepository.UploadAsync(projectDto.AudioFile, ProjectAudioDir);
            _logger.LogDebug("Audio file uploaded to {AudioPath}", audioPath);
        }

        string? imagePath = null;
        if (projectDto.ImageFile != null)
        {
            imagePath = await _blobStorageRepository.UploadAsync(projectDto.ImageFile, ProjectImageDir);
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
            ImagePath = imagePath,
            CreatedAt = DateTime.Today,
            UpdatedAt = DateTime.Today,
            UserId = userId
        };

        await _repository.AddAsync(project);
        return ConvertToProjectResponse(project);
    }

    public async Task<ProjectResponse?> GetProjectByIdAsync(int id, Guid userId)
    {
        _logger.LogInformation("Fetching project with Id: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id, userId);

        if (project == null)
        {
            _logger.LogWarning("No project found with Id: {ProjectId}", id);
            return null;
        }

        return ConvertToProjectResponse(project);
    }

    public async Task<bool> DeleteProjectAsync(int id, Guid userId)
    {
        _logger.LogInformation("Attempting to delete project with Id: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id, userId);

        if (project == null)
        {
            _logger.LogWarning("Project with Id: {ProjectId} not found. Deletion aborted.", id);
            return false;
        }

        await _blobStorageRepository.DeleteAsync(project.FilePath, ProjectFilesDir);
        _logger.LogDebug("Deleted compressed file at {FilePath}", project.FilePath);

        if (!string.IsNullOrEmpty(project.AudioPath))
        {
            await _blobStorageRepository.DeleteAsync(project.AudioPath, ProjectAudioDir);
            _logger.LogDebug("Deleted audio file at {AudioPath}", project.AudioPath);
        }

        if (!string.IsNullOrEmpty(project.ImagePath))
        {
            await _blobStorageRepository.DeleteAsync(project.ImagePath, ProjectImageDir);
            _logger.LogDebug("Deleted image file at {ImagePath}", project.ImagePath);
        }

        await _repository.DeleteProject(project);
        return true;
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
        var stream = await _blobStorageRepository.GetBlobStreamAsync(blobPath, blobContainer!);

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
    public async Task<ProjectResponse?> UpdateProjectAsync(int id, UpdateProjectRequest requestDto, Guid userId)
    {
        _logger.LogInformation("Starting update for project with ID: {ProjectId}", id);

        var project = await _repository.GetByIdAsync(id, userId);

        if (project == null)
        {
            _logger.LogWarning("Project with ID: {ProjectId} not found. Update aborted.", id);
            return null;
        }

        var updatedProject = await GetUpdatedProjectDTO(project, requestDto);

        await _repository.UpdateProjectAsync(updatedProject);
        return ConvertToProjectResponse(updatedProject);
    }

    private async Task<Project> GetUpdatedProjectDTO(Project project, UpdateProjectRequest requestDto)
    {
        var updatedProject = new Project
        {
            Id = project.Id,
            Name = requestDto.Name ?? project.Name,
            Description = requestDto.Description ?? project.Description,
            KeySignature = requestDto.KeySignature ?? project.KeySignature,
            Bpm = requestDto.Bpm ?? project.Bpm,
            Genre = requestDto.Genre ?? project.Genre,
            Daw = requestDto.Daw ?? project.Daw,
            FilePath = project.FilePath,
            AudioPath = project.AudioPath,
            ImagePath = project.ImagePath,
            CreatedAt = project.CreatedAt,
            UpdatedAt = DateTime.Today,
        };

        _logger.LogInformation("Updated Description: {ProjectDescription}", updatedProject.Description);

        if (requestDto.CompressedFile != null)
        {
            _logger.LogInformation("Uploading new compressed file for project ID: {ProjectId}", project.Id);
            var newFilesUrl = await _blobStorageRepository.UploadAsync(requestDto.CompressedFile, ProjectFilesDir);
            _logger.LogDebug("Uploaded compressed file to: {FilePath}", newFilesUrl);

            await _blobStorageRepository.DeleteAsync(project.FilePath, ProjectFilesDir);
            _logger.LogDebug("Deleted old compressed file from: {FilePath}", project.FilePath);

            updatedProject.FilePath = newFilesUrl;
        }

        if (requestDto.AudioFile != null)
        {
            _logger.LogInformation("Uploading new audio file for project ID: {ProjectId}", project.Id);
            var newAudioUrl = await _blobStorageRepository.UploadAsync(requestDto.AudioFile, ProjectAudioDir);
            _logger.LogDebug("Uploaded audio file to: {AudioPath}", newAudioUrl);

            if (!string.IsNullOrEmpty(project.AudioPath))
            {
                await _blobStorageRepository.DeleteAsync(project.AudioPath, ProjectAudioDir);
                _logger.LogDebug("Deleted old audio file from: {AudioPath}", project.AudioPath);
            }

            updatedProject.AudioPath = newAudioUrl;
        }

        if (requestDto.ImageFile != null)
        {
            _logger.LogInformation("Uploading new image file for project ID: {ProjectId}", project.Id);
            var newArtworkUrl = await _blobStorageRepository.UploadAsync(requestDto.ImageFile, ProjectImageDir);
            _logger.LogDebug("Uploaded image file to: {ImagePath}", newArtworkUrl);

            if (!string.IsNullOrEmpty(project.ImagePath))
            {
                await _blobStorageRepository.DeleteAsync(project.ImagePath, ProjectImageDir);
                _logger.LogDebug("Deleted old image file from: {ImagePath}", project.ImagePath);
            }

            updatedProject.ImagePath = newArtworkUrl;
        }

        return updatedProject;
    }

    private ProjectResponse ConvertToProjectResponse(Project project)
    {
        return new ProjectResponse
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            KeySignature = project.KeySignature,
            Bpm = project.Bpm,
            Daw = project.Daw,
            Genre = project.Genre,
            HasFile = !string.IsNullOrEmpty(project.FilePath),
            HasAudio = !string.IsNullOrEmpty(project.AudioPath),
            HasImage = !string.IsNullOrEmpty(project.ImagePath),
            CreatedAt = project.CreatedAt,
            UpdatedAt = project.UpdatedAt,
        };
    }
}
