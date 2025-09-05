using BeatBlock.Helpers;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
    {
        var token = await _authService.LoginAsync(loginDto.Email, loginDto.Password);
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
}
