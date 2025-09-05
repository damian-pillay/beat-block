using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Repositories;
using BeatBlock.Services;
using Humanizer;
using Microsoft.IdentityModel.Tokens;
using NSubstitute;

namespace BeatBlock.UnitTests;

public class UserServiceTests
{
    private IUserRepository _userRepositoryMock;
    private IUserService _userService;

    [SetUp]
    public void Setup()
    {
        _userRepositoryMock = Substitute.For<IUserRepository>();
        _userService = new UserService(_userRepositoryMock);
    }

    [Test]
    public async Task GIVEN_RegisterRequestForNewUser_WHEN_RegisteringUserAsync_RETURN_TrueAndAddsUser()
    {
        // Arrange
        var registerRequest = new RegisterRequestDTO
        {
            Email = "fake@email.com",
            FirstName = "John",
            LastName = "Doe",
            Alias = "JDoe",
            Password = "password",
        };

        _userRepositoryMock.EmailExistsAsync(registerRequest.Email).Returns(false);

        // Act
        var result = await _userService.RegisterUserAsync(registerRequest);

        // Assert
        Assert.That(result, Is.True);
        await _userRepositoryMock.Received(1).EmailExistsAsync(registerRequest.Email);
        await _userRepositoryMock.Received(1).AddUserAsync(Arg.Is<User>(u =>
            u.FirstName == registerRequest.FirstName &&
            u.LastName == registerRequest.LastName &&
            u.Alias == registerRequest.Alias &&
            u.Email == registerRequest.Email &&
            !string.IsNullOrEmpty(u.Password) &&
            u.Password != registerRequest.Password
        ));
    }

    [Test]
    public async Task GIVEN_RegisterRequestOfExistingUser_WHEN_RegisteringUserAsync_ReturnsFalseAndDoesNotAddUser()
    {
        // Arrange
        var registerRequest = new RegisterRequestDTO
        {
            Email = "fake@email.com",
            FirstName = "John",
            LastName = "Doe",
            Alias = "JDoe",
            Password = "password",
        };

        _userRepositoryMock.EmailExistsAsync(registerRequest.Email).Returns(true);

        // Act
        var result = await _userService.RegisterUserAsync(registerRequest);

        // Assert
        Assert.That(result, Is.False);
        await _userRepositoryMock.Received(1).EmailExistsAsync(registerRequest.Email);
        await _userRepositoryMock.DidNotReceive().AddUserAsync(Arg.Any<User>());
    }
    [Test]
    public async Task GIVEN_NonExistentUser_WHEN_GettingUserInfoAsync_THEN_ReturnsNull()
    {
        // Arrange
        var userId = Guid.NewGuid();
        _userRepositoryMock.GetByIdAsync(userId).Returns((User?)null);

        // Act
        var result = await _userService.GetUserInfoAsync(userId);

        // Assert
        Assert.That(result, Is.Null);
    }

    [Test]
    public async Task GIVEN_ExistingUser_WHEN_GettingUserInfoAsync_THEN_ReturnsMappedUserInfoDTO()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var user = new User
        {
            FirstName = "Jane",
            LastName = "Doe",
            Email = "jane@example.com",
            Alias = "jdoe"
        };

        _userRepositoryMock.GetByIdAsync(userId).Returns(user);

        // Act
        var result = await _userService.GetUserInfoAsync(userId);

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.Multiple(() =>
        {
            Assert.That(result.FirstName, Is.EqualTo(user.FirstName));
            Assert.That(result.LastName, Is.EqualTo(user.LastName));
            Assert.That(result.Email, Is.EqualTo(user.Email));
            Assert.That(result.Alias, Is.EqualTo(user.Alias));
        });
    }
}
