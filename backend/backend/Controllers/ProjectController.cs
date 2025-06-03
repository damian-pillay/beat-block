using BeatBlock.Helpers;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
using BeatBlock.Services;
using BeatBlock.Services.Validators;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly IProjectUploadValidator _uploadValidator;

    public ProjectController(IProjectService projectService, IProjectUploadValidator uploadValidator)
    {
        _projectService = projectService;
        _uploadValidator = uploadValidator;
    }

    [HttpGet]
    public ActionResult<GetAllProjectsResponse> GetAll()
    {
        var projects = _projectService.GetAllProjects();
        var response = new GetAllProjectsResponse(projects);

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    [HttpGet("{id}/{fileType}")]
    public async Task<IActionResult> GetProjectFile(int id, string fileType)
    {
        var result = await _projectService
            .GetProjectFileStreamAsync(
                id, 
                fileType.ToLower(), 
                ContentTypeHelper.ContentTypes, 
                ContentTypeHelper.DefaultContentType)
            ;

        if (result == null)
        {
            return NotFound();
        }

        Response.Headers.Append("Content-Disposition", $"attachment; filename=\"{result.FileName}\"");

        return File(result.FileStream, result.ContentType);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromForm] CreateProjectRequest projectDto)
    {
        _uploadValidator.Validate(projectDto, ModelState);

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var createdProject = await _projectService.CreateProjectAsync(projectDto);

        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromForm] UpdateProjectRequest projectDto)
    {
        _uploadValidator.Validate(projectDto, ModelState);

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var updatedProject = await _projectService.UpdateProjectAsync(id, projectDto);

        if (updatedProject == null)
        {
            return NotFound();
        }

        return Ok(updatedProject);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var result = await _projectService.DeleteProjectAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}
