using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Microsoft.AspNetCore.Http;
using NSubstitute;

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

            _projectRepositoryMock.Received(1).AddAsync(Arg.Any<Project>());
        });
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
}
