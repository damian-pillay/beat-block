using BeatBlock.Helpers;
using BeatBlock.Models.DTOs.Request;
using BeatBlock.Services;
using Microsoft.AspNetCore.Mvc;

namespace BeatBlock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
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
}
