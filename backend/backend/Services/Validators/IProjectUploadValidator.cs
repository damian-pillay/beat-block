using BeatBlock.Models.DTOs.Request;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BeatBlock.Services.Validators
{
    public interface IProjectUploadValidator
    {
        void Validate(IProjectRequest request, ModelStateDictionary modelState);
    }
}