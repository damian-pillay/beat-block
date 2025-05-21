using BeatBlock.DTOs.Request;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace BeatBlock.Validators
{
    public interface ProjectUploadValidator
    {
        void Validate(CreateProjectRequest request, ModelStateDictionary modelState);
    }
}