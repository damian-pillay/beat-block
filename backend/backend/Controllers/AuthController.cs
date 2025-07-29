using BeatBlock.Models;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Services;
using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        return Ok(new { token });
    }
}
