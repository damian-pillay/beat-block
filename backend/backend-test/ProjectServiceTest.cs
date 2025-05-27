using Azure.Storage.Blobs;
using BeatBlock.DTOs.Request;
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
}
