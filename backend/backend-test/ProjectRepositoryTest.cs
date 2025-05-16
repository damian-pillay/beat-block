using Microsoft.EntityFrameworkCore;
using BeatBlock.Repositories;
using BeatBlock.Data;
using BeatBlock.Models;

namespace BeatBlockTest;

public class ProjectRepositoryTest
{
    private AppDbContext _context = null!;
    private ProjectRepository _repository = null!;

    private DateTime TestTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);

    [SetUp]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        _context = new AppDbContext(options);

        _context.Project.Add(new Project
        {
            ProjectId = 1,
            Name = "Test Project",
            Description = "This is a demo project",
            KeySignature = "C#m",
            Bpm = 120,
            Genre = "Hip-Hop",
            Daw = "FL Studio",
            FilesUrl = "http://example.com/files.zip",
            AudioUrl = "http://example.com/audio.mp3",
            ArtworkUrl = "http://example.com/artwork.jpg",
            CreatedAt = TestTime,
            UpdatedAt = TestTime
        });

        _context.SaveChanges();
        _repository = new ProjectRepository(_context);
    }

    [Test]
    public void CALLING_GetAllProjects_RETURNS_AllProjectsInDataBase()
    {
        // Arrange
        var projects = _repository.GetAllProjects().ToList();

        // Act and Assert
        Assert.Multiple(() =>
        {
            Assert.That(projects.Count, Is.EqualTo(1));
            var project = projects[0];

            Assert.That(project.ProjectId, Is.EqualTo(1));
            Assert.That(project.Name, Is.EqualTo("Test Project"));
            Assert.That(project.Description, Is.EqualTo("This is a demo project"));
            Assert.That(project.KeySignature, Is.EqualTo("C#m"));
            Assert.That(project.Bpm, Is.EqualTo(120));
            Assert.That(project.Genre, Is.EqualTo("Hip-Hop"));
            Assert.That(project.Daw, Is.EqualTo("FL Studio"));
            Assert.That(project.FilesUrl, Is.EqualTo("http://example.com/files.zip"));
            Assert.That(project.AudioUrl, Is.EqualTo("http://example.com/audio.mp3"));
            Assert.That(project.ArtworkUrl, Is.EqualTo("http://example.com/artwork.jpg"));
            Assert.That(project.CreatedAt, Is.EqualTo(TestTime));
            Assert.That(project.UpdatedAt, Is.EqualTo(TestTime));
        });
    }
    [TearDown]
    public void TearDown()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}
