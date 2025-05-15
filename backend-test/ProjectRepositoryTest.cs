using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Repositories;

namespace backend_test;

public class ProjectEfTests
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

        _context.Projects.Add(new backend.Models.Project
        {
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
    public void CanFetchProject()
    {
        var projects = _repository.GetAllProjects().ToList();

        Assert.That(projects.Count, Is.EqualTo(1));
        var project = projects[0];

        Assert.Multiple(() =>
        {
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
