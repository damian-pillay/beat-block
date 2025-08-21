using BeatBlock.Helpers;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDTO registerDto)
    {
        var result = await _userService.RegisterUserAsync(registerDto);
           
        if (!result)
        {
            return BadRequest("Email already registered.");
        }

        return Ok("Registration successful.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
    {
        var token = await _userService.LoginAsync(loginDto.Email, loginDto.Password);
        if (token == null)
            return Unauthorized("Invalid username or password.");

        Response.Cookies.Append("access_token", token, new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTimeOffset.UtcNow.AddHours(2)
        });

        return Ok(new { message = "Login Successful" });
    }

    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("access_token");

        return Ok(new { message = "Logout successful" });
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetUserInfo()
    {
        if (User?.Identity == null || !User.Identity.IsAuthenticated)
        {
            return Ok(null);
        }

        var userId = User.GetUserId();

        var userInfo = await _userService.GetUserInfoAsync(userId);

        return Ok(userInfo);
    }
}
