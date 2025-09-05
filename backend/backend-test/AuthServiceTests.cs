using BeatBlock.Repositories;
using BeatBlock.Services;
using NSubstitute;
using BeatBlock.Models;
using Microsoft.Extensions.Configuration;

namespace BeatBlock.UnitTests;

[TestFixture]
public class AuthServiceTests
{
    private IUserRepository _userRepositoryMock;
    private IConfiguration _configurationMock;
    private AuthService _authService;

    private const string Password = "Secret123!";
    private const string WrongPassword = "BadPass123!";
    private const string Email = "test@example.com";
    private const string JwtSecret = "this_is_a_super_secret_key_123456"; 

    [SetUp]
    public void Setup()
    {
        _userRepositoryMock = Substitute.For<IUserRepository>();
        _configurationMock = Substitute.For<IConfiguration>();

        // Stub configuration for token generation
        _configurationMock["Jwt:Key"].Returns(JwtSecret);
        _configurationMock["Jwt:Issuer"].Returns("TestIssuer");
        _configurationMock["Jwt:Audience"].Returns("TestAudience");

        _authService = new AuthService(_userRepositoryMock, _configurationMock);
    }

    [Test]
    public async Task GIVEN_CorrectPassword_WHEN_LoginAsync_RETURN_ValidJwtToken()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = Email,
            Password = BCrypt.Net.BCrypt.HashPassword(Password)
        };

        _userRepositoryMock.GetByEmailAsync(Email).Returns(user);

        // Act
        var result = await _authService.LoginAsync(Email, Password);

        // Assert
        Assert.That(result, Is.Not.Null.And.Not.Empty);
        var parts = result.Split('.');
        Assert.That(parts.Length, Is.EqualTo(3), "JWT should contain 3 segments");
    }

    [Test]
    public async Task GIVEN_IncorrectPassword_WHEN_LoginAsync_RETURN_Null()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = Email,
            Password = BCrypt.Net.BCrypt.HashPassword(Password)
        };

        _userRepositoryMock.GetByEmailAsync(Email).Returns(user);

        // Act
        var result = await _authService.LoginAsync(Email, WrongPassword);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GIVEN_UnknownEmail_WHEN_LoginAsync_RETURN_Null()
    {
        // Arrange
        _userRepositoryMock.GetByEmailAsync(Email).Returns((User?)null);

        // Act
        var result = await _authService.LoginAsync(Email, Password);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GIVEN_UnknownEmail_WHEN_LoginAsync_RETURN_Nul()
    {
        // Act
        var result = await _authService.LoginAsync("", "");

        // Assert
        Assert.That(result, Is.Null);
    }
}
