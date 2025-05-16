using BeatBlock.Models;
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
    public ActionResult<IEnumerable<Project>> GetAll()
    {
        var projects = _projectService.GetAllProjects();
        return Ok(projects);
    }
}
