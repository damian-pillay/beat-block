using BeatBlock.DTOs.Request;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BeatBlock.Validators;

public class ProjectUploadValidator : IProjectUploadValidator
{
    private const long ByteMultiplier = 1024 * 1024;
    private const long MaxZipSize = 300 * ByteMultiplier;
    private const long MaxAudioSize = 30 * ByteMultiplier;
    private const long MaxImageSize = 5 * ByteMultiplier;

    public void Validate(CreateProjectRequest request, ModelStateDictionary modelState)
    {
        if (request.Mp3File != null)
        {
            if (request.Mp3File.Length > MaxAudioSize)
                modelState.AddModelError(nameof(request.Mp3File), "Uploaded file size exceeds the 30MB limit.");

            if (!Path.GetExtension(request.Mp3File.FileName).Equals(".mp3", StringComparison.OrdinalIgnoreCase))
                modelState.AddModelError(nameof(request.Mp3File), "Only .mp3 files are allowed.");
        }

        if (request.CoverImage != null)
        {
            if (request.CoverImage.Length > MaxImageSize)
                modelState.AddModelError(nameof(request.CoverImage), "Uploaded file size exceeds the 5MB limit.");

            var ext = Path.GetExtension(request.CoverImage.FileName).ToLowerInvariant();
            if (ext != ".jpg" && ext != ".jpeg" && ext != ".png")
                modelState.AddModelError(nameof(request.CoverImage), "Only .jpg, .jpeg, or .png images are allowed.");
        }

        if (request.ZipFile != null)
        {
            if (request.ZipFile.Length > MaxZipSize)
                modelState.AddModelError(nameof(request.ZipFile), "Uploaded file size exceeds the 300MB limit.");

            if (!Path.GetExtension(request.ZipFile.FileName).Equals(".zip", StringComparison.OrdinalIgnoreCase))
                modelState.AddModelError(nameof(request.ZipFile), "Only .zip files are allowed.");
        }
    }
}
