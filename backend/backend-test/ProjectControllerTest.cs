using BeatBlock.Controllers;
using BeatBlock.DTOs.Response;
using BeatBlock.Models;
using BeatBlock.Services;
using BeatBlock.Validators;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using NUnit.Framework.Legacy;

namespace BeatBlockTest;

public class ProjectControllerTest
{
    private IProjectService _projectService = null!;
    private IProjectUploadValidator _uploadValidator = null!;

    private ProjectController _controller = null!;

    [SetUp]
    public void Setup()
    {
        _uploadValidator = Substitute.For<IProjectUploadValidator>();
        _projectService = Substitute.For<IProjectService>();
        _controller = new ProjectController(_projectService, _uploadValidator);
    }

    [Test]
    public void CALLING_GetAll_RETURNS_OkWithProjects()
    {
        // Arrange
        var testProjects = new List<Project>
        {
            new Project { Name = "Project One", Daw = "FL Studio", FilesUrl = "http://example.com/projectOne.zip" },
            new Project { Name = "Project Two", Daw = "Ableton Live", FilesUrl = "http://example.com/projectTwo.zip" },
        };

        _projectService.GetAllProjects().Returns(testProjects);

        // Act
        var result = _controller.GetAll();

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());

            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);

            var returnedProjects = okResult!.Value as GetAllProjectsResponse;
            Assert.That(returnedProjects, Is.Not.Null);
            CollectionAssert.AreEqual(testProjects, returnedProjects!.Projects);
        });
    }
}
