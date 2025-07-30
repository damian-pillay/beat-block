using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BeatBlock.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _config;

    const string dummyHash = "$2a$12$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

    public UserService(IUserRepository userRepository, IConfiguration config)
    {
        _userRepository = userRepository;
        _config = config;
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

    public async Task<string?> LoginAsync(string email, string password)
    { 
        var user = await _userRepository.GetByEmailAsync(email);

        var hashToCheck = user?.Password ?? dummyHash;

        var passwordValid = BCrypt.Net.BCrypt.Verify(password, hashToCheck);

        if (user == null)
        {
            return null;
        }

        if (!passwordValid)
        {
            return null;
        }

        return GenerateToken(user);
    }

    public async Task<bool> UserExistsAsync(Guid userId)
    {
        return await _userRepository.IdExistsAsync(userId);
    }

    private string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
