using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.AspNetCore.Http;
using NSubstitute;
using System.Reflection.Metadata;

namespace BeatBlock.UnitTests;

public class ProjectServiceTest
{
    private IProjectRepository _projectRepositoryMock;
    private IBlobStorageService _blobStorageServiceMock;
    private IProjectService _projectService = null!;

    [SetUp]
    public void Setup()
    {
        _projectRepositoryMock = Substitute.For<IProjectRepository>();
        _blobStorageServiceMock = Substitute.For<IBlobStorageService>();

        _projectService = new ProjectService(_projectRepositoryMock, _blobStorageServiceMock);
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

        var zipFile = FormFileHelper.CreateFakeFormFile("ZIP DATA", zipName);
        var mp3File = FormFileHelper.CreateFakeFormFile("MP3 DATA", mp3Name, "audio/mpeg");
        var imageFile = FormFileHelper.CreateFakeFormFile("IMAGE DATA", imageName, "image/jpeg");

        var request = new CreateProjectRequest
        {
            Name = "Test Project",
            Description = "Just for testing purposes",
            KeySignature = "G#m",
            Bpm = 140,
            Genre = "Trap",
            Daw = "FL Studio",
            ZipFile = zipFile,
            Mp3File = mp3File,
            CoverImage = imageFile
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
            Assert.That(result.FilesUrl, Is.EqualTo(expectedZipPath));
            Assert.That(result.AudioUrl, Is.EqualTo(expectedMp3Path));
            Assert.That(result.ArtworkUrl, Is.EqualTo(expectedImagePath));
        });

        await _projectRepositoryMock.Received(1).AddAsync(Arg.Any<Project>());
    }

    [Test]
    public async Task GIVEN_NullOptionalFiles_USING_CreateProjectAsync_RETURNS_ProjectWithoutUrls()
    {
        // Arrange
        var zipName = "project.zip";
        var zipContainer = "project-files";
        var zipFile = FormFileHelper.CreateFakeFormFile("ZIP DATA", zipName);


        var request = new CreateProjectRequest
        {
            Name = "Test Project",
            Daw = "FL Studio",
            ZipFile = zipFile
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
            Assert.That(result.FilesUrl, Is.EqualTo(expectedZipPath));
            Assert.That(result.AudioUrl, Is.Null);
            Assert.That(result.ArtworkUrl, Is.Null);
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
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>());
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
            FilesUrl = "files/url.zip",
            AudioUrl = "audio/url.mp3",
            ArtworkUrl = "artwork/url.jpg"
        };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(Task.FromResult<Project?>(project));

        var result = await _projectService.DeleteProjectAsync(projectId);

        Assert.That(result, Is.True);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.FilesUrl);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.AudioUrl);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.ArtworkUrl);
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
            FilesUrl = "files/url.zip",
            AudioUrl = null,
            ArtworkUrl = null
        };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(Task.FromResult<Project?>(project));

        var result = await _projectService.DeleteProjectAsync(projectId);

        Assert.That(result, Is.True);
        await _blobStorageServiceMock.Received(1).DeleteAsync(project.FilesUrl);
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(project.AudioUrl!);
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(project.ArtworkUrl!);
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
        await _blobStorageServiceMock.DidNotReceive().DeleteAsync(Arg.Any<string>());
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
            FilesUrl = "old/file.zip"
        };

        var zipContainer = "project-files";
        var expectedFilePath = "project-files/file.zip";

        var zipMock = Substitute.For<IFormFile>();
        var updateDto = new UpdateProjectRequest { ZipFile = zipMock };

        _projectRepositoryMock.GetByIdAsync(projectId).Returns(project);
        _blobStorageServiceMock.UploadAsync(zipMock, zipContainer).Returns(expectedFilePath);

        // Act
        var result = await _projectService.UpdateProjectAsync(projectId, updateDto);

        // Assert
        Assert.That(result!.FilesUrl, Is.EqualTo(expectedFilePath));
        await _blobStorageServiceMock.Received(1).DeleteAsync(oldFilesUrl);
        await _blobStorageServiceMock.Received(1).UploadAsync(zipMock, zipContainer);
        await _projectRepositoryMock.Received(1).UpdateProjectAsync(project);
    }
}
