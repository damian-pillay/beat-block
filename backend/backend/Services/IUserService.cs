using BeatBlock.Models.DTOs.Request;
using BeatBlock.Models.DTOs.Response;

namespace BeatBlock.Services;

public interface IUserService
{
    Task<bool> RegisterUserAsync(RegisterRequestDTO registerDto);
}
