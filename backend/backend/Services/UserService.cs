using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;
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

    public async Task<bool> UserExistsAsync(Guid userId)
    {
        return await _userRepository.IdExistsAsync(userId);
    }

    public async Task<UserInfoDTO?> GetUserInfoAsync(Guid userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
        {
            return null;
        }

        var userInfo = new UserInfoDTO
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Alias = user.Alias,
        };

        return userInfo;
    }
}
