using BeatBlock.DTOs.Request;
using BeatBlock.DTOs.Response;
using BeatBlock.Services;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private const long ByteMultiplier = 1024 * 1024;

    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public ActionResult<GetAllProjectsResponse> GetAll()
    {
        var projects = _projectService.GetAllProjects();
        var response = new GetAllProjectsResponse(projects);

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromForm] CreateProjectRequest projectDto)
    {
        const long maxFileSize = 300 * ByteMultiplier; // MB to bytes
        const long maxAudioSize = 30 * ByteMultiplier;
        const long maxImageSize = 5 * ByteMultiplier;

        if (projectDto.Mp3File != null && projectDto.Mp3File.Length > maxFileSize)
        {
            ModelState.AddModelError(nameof(projectDto.Mp3File), "MP3 file size exceeds the 30MB limit.");
        }

        if (projectDto.CoverImage != null && projectDto.CoverImage.Length > maxImageSize)
        {
            ModelState.AddModelError(nameof(projectDto.CoverImage), "Cover image size exceeds the 5MB limit.");
        }

        if (projectDto.ZipFile != null && projectDto.ZipFile.Length > maxAudioSize)
        {
            ModelState.AddModelError(nameof(projectDto.ZipFile), "Project ZIP file size exceeds the 300MB limit.");
        }

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }
        
        var createdProject = await _projectService.CreateProjectAsync(projectDto);

        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.ProjectId }, createdProject);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null) return NotFound();

        return Ok(project);
    }
}
