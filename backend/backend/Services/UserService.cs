using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Repositories;

namespace BeatBlock.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }


    public async Task<bool> RegisterUserAsync(RegisterRequestDTO registerDto)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        var userExists = await _userRepository.EmailExistsAsync(registerDto.Email);

        if (userExists)
        {
            return false;
        }

        var user = new User
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Alias = registerDto.Alias,
            Email = registerDto.Email,
            Password = hashedPassword
        };

        await _userRepository.AddUserAsync(user);
        return true;
    }
}
