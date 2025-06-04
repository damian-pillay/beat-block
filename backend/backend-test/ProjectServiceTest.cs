using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.AspNetCore.Http;
using NSubstitute;
using BeatBlock.Helpers;
using Castle.Core.Logging;
using Microsoft.Extensions.Logging;

namespace BeatBlock.UnitTests;

public class ProjectServiceTest
{
    private IProjectRepository _projectRepositoryMock;
    private IBlobStorageService _blobStorageServiceMock;
    private IProjectService _projectService = null!;
    private ILogger<ProjectService> _loggerMock;

    private const string ProjectFilesDir = "project-files";
    private const string ProjectAudioDir = "project-audio";
    private const string ProjectImageDir = "project-images";

    private readonly DateTime fixedTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);

    [SetUp]
    public void Setup()
    {
        _projectRepositoryMock = Substitute.For<IProjectRepository>();
        _blobStorageServiceMock = Substitute.For<IBlobStorageService>();
        _loggerMock = Substitute.For<ILogger<ProjectService>>();

        _projectService = new ProjectService(_projectRepositoryMock, _blobStorageServiceMock, _loggerMock);
    }

    [Test]
    public async Task GIVEN_CreateProjectRequest_USING_CreateProjectAsync_RETURNS_Project()
    {
        // Arrange
        var zipName = "project.zip";
        var mp3Name = "audio.mp3";
        var imageName = "image.jpg";

        var zipContainer = "project-files";
        var audioContainer = "project-audio";
        var imageContainer = "project-images";

        var zipFile = Substitute.For<IFormFile>();
        var mp3File = Substitute.For<IFormFile>();
        var imageFile = Substitute.For<IFormFile>();

        var request = new CreateProjectRequest
        {
            Name = "Test Project",
            Description = "Just for testing purposes",
            KeySignature = "G#m",
            Bpm = 140,
            Genre = "Trap",
            Daw = "FL Studio",
            CompressedFile = zipFile,
            AudioFile = mp3File,
            ImageFile = imageFile
        };

        var expectedZipPath = $"{zipContainer}/{zipName}";
        var expectedMp3Path = $"{audioContainer}/{mp3Name}";
        var expectedImagePath = $"{imageContainer}/{imageName}";

        _blobStorageServiceMock.UploadAsync(Arg.Any<IFormFile>(), zipContainer).Returns(expectedZipPath);
        _blobStorageServiceMock.UploadAsync(Arg.Any<IFormFile>(), audioContainer).Returns(expectedMp3Path);
        _blobStorageServiceMock.UploadAsync(Arg.Any<IFormFile>(), imageContainer).Returns(expectedImagePath);

        // Act
        var result = await _projectService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(request.Name));
            Assert.That(result.Description, Is.EqualTo(request.Description));
            Assert.That(result.KeySignature, Is.EqualTo(request.KeySignature));
            Assert.That(result.Bpm, Is.EqualTo(request.Bpm));
            Assert.That(result.Genre, Is.EqualTo(request.Genre));
            Assert.That(result.Daw, Is.EqualTo(request.Daw));
            Assert.That(result.FilePath, Is.EqualTo(expectedZipPath));
            Assert.That(result.AudioPath, Is.EqualTo(expectedMp3Path));
            Assert.That(result.ImagePath, Is.EqualTo(expectedImagePath));
        });

        await _projectRepositoryMock.Received(1).AddAsync(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_NullOptionalFiles_USING_CreateProjectAsync_RETURNS_ProjectWithoutUrls()
    {
        // Arrange
        var zipName = "project.zip";
        var zipContainer = "project-files";
        var zipFile = Substitute.For<IFormFile>();


        var request = new CreateProjectRequest
        {
            Name = "Test Project",
            Daw = "FL Studio",
            CompressedFile = zipFile
        };

        var expectedZipPath = $"{zipContainer}/{zipName}";

        _blobStorageServiceMock.UploadAsync(Arg.Any<IFormFile>(), zipContainer).Returns(expectedZipPath);

        // Act
        var result = await _projectService.CreateProjectAsync(request);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Name, Is.EqualTo(request.Name));
            Assert.That(result.Description, Is.Null);
            Assert.That(result.KeySignature, Is.Null);
            Assert.That(result.Bpm, Is.Null);
            Assert.That(result.Genre, Is.Null);
            Assert.That(result.Daw, Is.EqualTo(request.Daw));
            Assert.That(result.FilePath, Is.EqualTo(expectedZipPath));
            Assert.That(result.AudioPath, Is.Null);
            Assert.That(result.ImagePath, Is.Null);
        });

        await _projectRepositoryMock.Received(1).AddAsync(Arg.Any<Project>());
        await _blobStorageServiceMock.DidNotReceive().UploadAsync(Arg.Any<IFormFile>(), "project-audio");
        await _blobStorageServiceMock.DidNotReceive().UploadAsync(Arg.Any<IFormFile>(), "project-images");
    }

    [Test]
    public async Task GIVEN_NonExistentProjectId_USING_DeleteProjectAsync_RETURNS_FalseAndDoesNotDelete()
    {
        // Arrange
        int projectId = 1;

        _projectRepositoryMock
            .GetByIdAsync(projectId)
            .Returns(Task.FromResult<Project?>(null));

        // Act
        var result = await _projectService.DeleteProjectAsync(projectId);

        // Assert

        Assert.That(result, Is.False);
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>(), Arg.Any<string>());
        await _projectRepositoryMock.DidNotReceive().DeleteProject(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_ExistingProjectWithUrls_USING_DeleteProjectAsync_DeletesFilesAndReturnsTrue()
    {
        var projectId = 1;
        var project = new Project
        {
            Name = "Test Project",
            Daw = "FL Studio",
            FilePath = "files/url.zip",
            AudioPath = "audio/url.mp3",
            ImagePath = "artwork/url.jpg"
        };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(Task.FromResult<Project?>(project));

        var result = await _projectService.DeleteProjectAsync(projectId);

        Assert.That(result, Is.True);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.FilePath, ProjectFilesDir);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.AudioPath, ProjectAudioDir);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.ImagePath, ProjectImageDir);
        await _projectRepositoryMock.Received(1).DeleteProject(project);
    }

    [Test]
    public async Task GIVEN_ExistingProjectWithMissingFilePaths_USING_DeleteProjectAsync_DeletesOnlyPresentFilePathsAndReturnsTrue()
    {
        var projectId = 1;
        var project = new Project
        {
            Name = "Test Project",
            Daw = "FL Studio",
            FilePath = "files/url.zip",
            AudioPath = null,
            ImagePath = null
        };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(Task.FromResult<Project?>(project));

        var result = await _projectService.DeleteProjectAsync(projectId);

        Assert.That(result, Is.True);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.FilePath, ProjectFilesDir);
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(project.AudioPath!, ProjectAudioDir);
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(project.ImagePath!, ProjectImageDir);
        await _projectRepositoryMock.Received(1).DeleteProject(project);
    }

    [Test]
    public async Task GIVEN_NonExistentProject_USING_UpdateProjectAsync_REturnsNullAndSkipsUpdates()
    {
        // Arrange
        var invalidId = 999;
        var request = new UpdateProjectRequest();

        _projectRepositoryMock.GetByIdAsync(invalidId).Returns((Project?)null);

        // Act
        var result = await _projectService.UpdateProjectAsync(invalidId, request);

        // Assert
        Assert.That(result, Is.Null);
        await _projectRepositoryMock.DidNotReceive().UpdateProjectAsync(Arg.Any<Project>());
        await _blobStorageServiceMock.DidNotReceive().UploadAsync(Arg.Any<IFormFile>(), Arg.Any<string>());
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>(), Arg.Any<string>());
    }

    [Test]
    public async Task GIVEN_ExistingProjectWithZipFile_USING_UpdateProjectAsync_UpdatesFileAndDeletesOldFile()
    {
        // Arrange
        var projectId = 1;
        var oldFilesUrl = "old/file.zip";
        var project = new Project
        {
            Id = projectId,
            Name = "Test Project",
            Daw = "FL Studio",
            Genre = "Hip-Hop",
            Bpm = 100,
            KeySignature = "Cm",
            CreatedAt = fixedTime,
            UpdatedAt = fixedTime,
            FilePath = oldFilesUrl,
        };

        var zipContainer = "project-files";
        var expectedFilePath = "project-files/file.zip";

        var zipMock = Substitute.For<IFormFile>();
        var updateDto = new UpdateProjectRequest { CompressedFile = zipMock };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(project);
        _blobStorageServiceMock.UploadAsync(zipMock, zipContainer).Returns(expectedFilePath);

        // Act
        var result = await _projectService.UpdateProjectAsync(projectId, updateDto);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo(1));
            Assert.That(result!.Name, Is.EqualTo("Test Project"));
            Assert.That(result.Daw, Is.EqualTo("FL Studio"));
            Assert.That(result.Genre, Is.EqualTo("Hip-Hop"));
            Assert.That(result.Bpm, Is.EqualTo(100));
            Assert.That(result.KeySignature, Is.EqualTo("Cm"));
            Assert.That(result.CreatedAt, Is.EqualTo(fixedTime));
            Assert.That(result.UpdatedAt, Is.Not.EqualTo(fixedTime));
            Assert.That(result!.FilePath, Is.EqualTo(expectedFilePath));
        });

        await _blobStorageServiceMock.Received(1).DeleteAsync(oldFilesUrl, zipContainer);
        await _blobStorageServiceMock.Received(1).UploadAsync(zipMock, zipContainer);
        await _projectRepositoryMock.Received(1).UpdateProjectAsync(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_ExistingProjectWithoutAudio_USING_UpdateProjectAsync_UpdatesFileAndDeletesNothing()
    {
        // Arrange
        var projectId = 1;
        var oldAudioUrl = (string?)null;
        var project = new Project
        {
            Id = projectId,
            Name = "Test Project",
            Daw = "FL Studio",
            Genre = "Hip-Hop",
            Bpm = 100,
            KeySignature = "Cm",
            CreatedAt = fixedTime,
            UpdatedAt = fixedTime,
            AudioPath = oldAudioUrl!
        };

        var audioContainer = "project-audio";
        var expectedAudioPath = "project-audio/audio.mp3";

        var audioMock = Substitute.For<IFormFile>();
        var updateDto = new UpdateProjectRequest { AudioFile = audioMock };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(project);
        _blobStorageServiceMock.UploadAsync(audioMock, audioContainer).Returns(expectedAudioPath);

        // Act
        var result = await _projectService.UpdateProjectAsync(projectId, updateDto);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo(1));
            Assert.That(result!.Name, Is.EqualTo("Test Project"));
            Assert.That(result.Daw, Is.EqualTo("FL Studio"));
            Assert.That(result.Genre, Is.EqualTo("Hip-Hop"));
            Assert.That(result.Bpm, Is.EqualTo(100));
            Assert.That(result.KeySignature, Is.EqualTo("Cm"));
            Assert.That(result.CreatedAt, Is.EqualTo(fixedTime));
            Assert.That(result.UpdatedAt, Is.Not.EqualTo(fixedTime));
            Assert.That(result!.AudioPath, Is.EqualTo(expectedAudioPath));
        });

        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>(), Arg.Any<string>());
        await _blobStorageServiceMock.Received(1).UploadAsync(audioMock, audioContainer);
        await _projectRepositoryMock.Received(1).UpdateProjectAsync(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_ExistingProjectWithOnlyBasicData_USING_UpdateProjectAsync_UpdatesBasicFieldsAndSkipsFileHandling()
    {
        // Arrange
        var initialProject = new Project
        {
            Id = 1,
            Name = "Old",
            Description = "Old Desc",
            Daw = "FL Studio",
            Genre = "Hip-Hop",
            Bpm = 100,
            KeySignature = "Cm",
            CreatedAt = fixedTime,
            UpdatedAt = fixedTime
        };

        var updateDto = new UpdateProjectRequest
        {
            Name = "New",
            Description = "New Desc",
            Daw = "Ableton",
            Genre = "Trap",
            Bpm = 120,
            KeySignature = "Am"
        };

        _projectRepositoryMock.GetByIdAsync(1).Returns(initialProject);

        // Act
        var result = await _projectService.UpdateProjectAsync(1, updateDto);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Id, Is.EqualTo(1));
            Assert.That(result!.Name, Is.EqualTo("New"));
            Assert.That(result.Description, Is.EqualTo("New Desc"));
            Assert.That(result.Daw, Is.EqualTo("Ableton"));
            Assert.That(result.Genre, Is.EqualTo("Trap"));
            Assert.That(result.Bpm, Is.EqualTo(120));
            Assert.That(result.KeySignature, Is.EqualTo("Am"));
            Assert.That(result.CreatedAt, Is.EqualTo(fixedTime));
            Assert.That(result.UpdatedAt, Is.Not.EqualTo(fixedTime));
        });

        await _blobStorageServiceMock.DidNotReceive().UploadAsync(Arg.Any<IFormFile>(), Arg.Any<string>());
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>(), Arg.Any<string>());
        await _projectRepositoryMock.Received(1).UpdateProjectAsync(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_NoBlobPathInRepository_USING_GetProjectFileStreamAsync_ReturnsNull()
    {
        // Arrange
        int projectId = 1;
        string fileType = "files";

        _projectRepositoryMock.GetCompressedFilePathAsync(projectId).Returns((string?)null);

        // Act
        var result = await _projectService.GetProjectFileStreamAsync(projectId, fileType, ContentTypeHelper.ContentTypes, ContentTypeHelper.DefaultContentType);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GIVEN_BlobPathButNullStream_USING_GetProjectFileStreamAsync_ReturnsNull()
    {
        // Arrange
        int projectId = 1;
        string fileType = "audio";
        string blobPath = "music.mp3";

        _projectRepositoryMock.GetAudioFilePathAsync(projectId).Returns(blobPath);
        _blobStorageServiceMock.GetBlobStreamAsync(blobPath, ProjectAudioDir).Returns((Stream?)null);

        // Act
        var result = await _projectService.GetProjectFileStreamAsync(projectId, fileType, ContentTypeHelper.ContentTypes, ContentTypeHelper.DefaultContentType);

        // Assert
        Assert.That(result, Is.Null);
    }
}
