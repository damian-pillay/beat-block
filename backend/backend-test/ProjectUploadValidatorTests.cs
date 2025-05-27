using BeatBlock.Models.DTOs.Request;
using BeatBlock.Validators;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BeatBlock.UnitTests;

public class ProjectUploadValidatorTests
{
    private ProjectUploadValidator _validator;
    private ModelStateDictionary _modelState;

    [SetUp]
    public void Setup()
    {
        _validator = new ProjectUploadValidator();
        _modelState = new ModelStateDictionary();
    }

    [Test]
    public void GIVEN_ValidFiles_USING_Validate_ModelStateIsValid()
    {
        // Arrange
        var request = new CreateProjectRequest
        {
            Mp3File = FormFileHelper.CreateFakeFormFile("audio content", "track.mp3"),
            CoverImage = FormFileHelper.CreateFakeFormFile("image content", "cover.jpg"),
            ZipFile = FormFileHelper.CreateFakeFormFile("zip content", "project.zip")
        };

        // Act
        _validator.Validate(request, _modelState);

        // Assert
        Assert.That(_modelState.IsValid, Is.True);
    }

    [Test]
    public void GIVEN_LargeImageFile_USING_Validate_AddsFileSizeError()
    {
        var request = new CreateProjectRequest
        {
            CoverImage = FormFileHelper.CreateFakeFormFile(new string('a', 6 * 1024 * 1024), "cover.jpg")
        };

        _validator.Validate(request, _modelState);

        Assert.Multiple(() =>
        {
            Assert.That(_modelState.ContainsKey(nameof(request.CoverImage)), Is.True);
            Assert.That(_modelState[nameof(request.CoverImage)].Errors[0].ErrorMessage, Does.Contain("5MB"));
        });
    }

    [TestCase("cover.jpg")]
    [TestCase("cover.jpeg")]
    [TestCase("cover.png")]
    public void GIVEN_ValidImageExtension_USING_Validate_DoesNotAddErrors(string fileName)
    {
        var request = new CreateProjectRequest
        {
            CoverImage = FormFileHelper.CreateFakeFormFile("image content", fileName)
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.IsValid, Is.True);
    }

    [Test]
    public void GIVEN_InvalidImageExtension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            CoverImage = FormFileHelper.CreateFakeFormFile("image content", "cover.bmp")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.CoverImage)), Is.True);
        Assert.That(_modelState[nameof(request.CoverImage)].Errors[0].ErrorMessage, Does.Contain(".jpg"));
    }

    [Test]
    public void GIVEN_InvalidZipExtension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            ZipFile = FormFileHelper.CreateFakeFormFile("zip content", "project.rar")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.ZipFile)), Is.True);
        Assert.That(_modelState[nameof(request.ZipFile)].Errors[0].ErrorMessage, Does.Contain(".zip"));
    }

    [Test]
    public void GIVEN_InvalidMp3Extension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            Mp3File = FormFileHelper.CreateFakeFormFile("audio content", "track.wav", "audio/wav")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.Mp3File)), Is.True);
        Assert.That(_modelState[nameof(request.Mp3File)].Errors[0].ErrorMessage, Does.Contain(".mp3"));
    }
}
