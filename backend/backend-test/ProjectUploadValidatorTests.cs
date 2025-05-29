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
            AudioFile = FormFileHelper.CreateFakeFormFile("audio content", "track.mp3"),
            ImageFile = FormFileHelper.CreateFakeFormFile("image content", "cover.jpg"),
            CompressedFile = FormFileHelper.CreateFakeFormFile("zip content", "project.zip")
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
            ImageFile = FormFileHelper.CreateFakeFormFile(new string('a', 6 * 1024 * 1024), "cover.jpg")
        };

        _validator.Validate(request, _modelState);

        Assert.Multiple(() =>
        {
            Assert.That(_modelState.ContainsKey(nameof(request.ImageFile)), Is.True);
            Assert.That(_modelState[nameof(request.ImageFile)].Errors[0].ErrorMessage, Does.Contain("5MB"));
        });
    }

    [TestCase("cover.jpg")]
    [TestCase("cover.jpeg")]
    [TestCase("cover.png")]
    public void GIVEN_ValidImageExtension_USING_Validate_DoesNotAddErrors(string fileName)
    {
        var request = new CreateProjectRequest
        {
            ImageFile = FormFileHelper.CreateFakeFormFile("image content", fileName)
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.IsValid, Is.True);
    }

    [Test]
    public void GIVEN_InvalidImageExtension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            ImageFile = FormFileHelper.CreateFakeFormFile("image content", "cover.bmp")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.ImageFile)), Is.True);
        Assert.That(_modelState[nameof(request.ImageFile)].Errors[0].ErrorMessage, Does.Contain(".jpg"));
    }

    [Test]
    public void GIVEN_InvalidZipExtension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            CompressedFile = FormFileHelper.CreateFakeFormFile("zip content", "project.rar")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.CompressedFile)), Is.True);
        Assert.That(_modelState[nameof(request.CompressedFile)].Errors[0].ErrorMessage, Does.Contain(".zip"));
    }

    [Test]
    public void GIVEN_InvalidMp3Extension_USING_Validate_AddsFormatError()
    {
        var request = new CreateProjectRequest
        {
            AudioFile = FormFileHelper.CreateFakeFormFile("audio content", "track.wav", "audio/wav")
        };

        _validator.Validate(request, _modelState);

        Assert.That(_modelState.ContainsKey(nameof(request.AudioFile)), Is.True);
        Assert.That(_modelState[nameof(request.AudioFile)].Errors[0].ErrorMessage, Does.Contain(".mp3"));
    }
}
