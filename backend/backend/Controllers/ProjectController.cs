using BeatBlock.Helpers;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
using BeatBlock.Services;
using BeatBlock.Services.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly IProjectUploadValidator _uploadValidator;
    private readonly IUserService _userService;
    private readonly ILogger _logger;

    public ProjectController(IProjectService projectService, IProjectUploadValidator uploadValidator, ILogger<ProjectController> logger, IUserService userService)
    {
        _projectService = projectService;
        _uploadValidator = uploadValidator;
        _logger = logger;
        _userService = userService;
    }

    [HttpGet]
    public ActionResult<GetAllProjectsResponse> GetAll()
    {
        _logger.LogInformation("Fetching all projects");
        var projectsResponse = _projectService.GetAllProjects();
        var response = new GetAllProjectsResponse(projectsResponse);

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var userId = GetUserId();

        _logger.LogInformation("Fetching project by ID: {ProjectId} for user by ID: {UserId}", id, userId);
        var project = await _projectService.GetProjectByIdAsync(id, userId);

        if (project == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found for User with ID {UserId}", id, userId);
            return Forbid();
        }

        _logger.LogInformation("Project found: {ProjectName} (Id: {ProjectId}) for User with ID {UserId}", project.Name, project.Id, userId);
        return Ok(project);
    }

    [HttpGet("{id}/{fileType}")]
    public async Task<IActionResult> GetProjectFile(int id, string fileType)
    {
        _logger.LogInformation("Fetching file of type '{FileType}' for project ID: {ProjectId}", fileType, id);

        var result = await _projectService
            .GetProjectFileStreamAsync(
                id,
                fileType.ToLower(),
                ContentTypeHelper.ContentTypes,
                ContentTypeHelper.DefaultContentType
            );

        if (result == null)
        {
            _logger.LogWarning("File of type '{FileType}' for project ID {ProjectId} not found", fileType, id);
            return NotFound();
        }

        Response.Headers.Append("Content-Disposition", $"attachment; filename=\"{result.FileName}\"");

        return File(result.FileStream, result.ContentType);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromForm] CreateProjectRequest projectDto)
    {
        var userId = GetUserId();

        if (!await _userService.UserExistsAsync(userId))
        {
            _logger.LogWarning("User ID {UserId} does not exist in the system", userId);
            return Forbid();
        }

        _logger.LogInformation("Received request to create a new project");
        _uploadValidator.Validate(projectDto, ModelState);

        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Project creation failed validation");
            return ValidationProblem(ModelState);
        }

        var createdProject = await _projectService.CreateProjectAsync(projectDto, userId);

        _logger.LogInformation("Project created successfully with ID: {ProjectId}", createdProject.Id);

        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromForm] UpdateProjectRequest projectDto)
    {
        var userId = GetUserId();
        _logger.LogInformation("Received request to update project ID: {ProjectId}", id);

        _uploadValidator.Validate(projectDto, ModelState);

        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Project update failed validation for project ID: {ProjectId}", id);
            return ValidationProblem(ModelState);
        }

        var updatedProject = await _projectService.UpdateProjectAsync(id, projectDto, userId);

        if (updatedProject == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found for update", id);
            return Forbid();
        }

        _logger.LogInformation("Project with ID {ProjectId} updated successfully", id);
        return Ok(updatedProject);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserId();

        _logger.LogInformation("Received request to delete project ID: {ProjectId}", id);
        var result = await _projectService.DeleteProjectAsync(id, userId);

        if (!result)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found for deletion", id);
            return Forbid();
        }

        _logger.LogInformation("Project with ID {ProjectId} deleted successfully", id);
        return NoContent();
    }

    private Guid GetUserId() =>
        Guid.Parse(User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?
            .Value ?? throw new UnauthorizedAccessException());
}
