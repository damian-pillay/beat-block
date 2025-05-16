using BeatBlock.DTOs;
using BeatBlock.Services;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public ActionResult<GetAllProjectsRequest> GetAll()
    {
        var projects = _projectService.GetAllProjects();
        var response = new GetAllProjectsRequest(projects);

        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectRequest projectDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var createdProject = await _projectService.CreateProjectAsync(projectDto);

        return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.ProjectId }, createdProject);
    }

    [HttpGet]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null) return NotFound();

        return Ok(project);
    }
}
