using BeatBlock.Models.DTOs.Request;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BeatBlock.Services.Validators;

public class ProjectUploadValidator : IProjectUploadValidator
{
    private const long ByteMultiplier = 1024 * 1024;
    private const long MaxZipSize = 300 * ByteMultiplier;
    private const long MaxAudioSize = 30 * ByteMultiplier;
    private const long MaxImageSize = 5 * ByteMultiplier;

    public void Validate(IProjectRequest request, ModelStateDictionary modelState)
    {
        if (request.AudioFile != null)
        {
            if (request.AudioFile.Length > MaxAudioSize)
                modelState.AddModelError(nameof(request.AudioFile), "Uploaded file size exceeds the 30MB limit.");

            if (!Path.GetExtension(request.AudioFile.FileName).Equals(".mp3", StringComparison.OrdinalIgnoreCase))
                modelState.AddModelError(nameof(request.AudioFile), "Only .mp3 files are allowed.");
        }

        if (request.ImageFile != null)
        {
            if (request.ImageFile.Length > MaxImageSize)
                modelState.AddModelError(nameof(request.ImageFile), "Uploaded file size exceeds the 5MB limit.");

            var ext = Path.GetExtension(request.ImageFile.FileName).ToLowerInvariant();
            if (ext != ".jpg" && ext != ".jpeg" && ext != ".png")
                modelState.AddModelError(nameof(request.ImageFile), "Only .jpg, .jpeg, or .png images are allowed.");
        }

        if (request.CompressedFile != null)
        {
            if (request.CompressedFile.Length > MaxZipSize)
                modelState.AddModelError(nameof(request.CompressedFile), "Uploaded file size exceeds the 300MB limit.");

            if (!Path.GetExtension(request.CompressedFile.FileName).Equals(".zip", StringComparison.OrdinalIgnoreCase))
                modelState.AddModelError(nameof(request.CompressedFile), "Only .zip files are allowed.");
        }
    }
}
