namespace BeatBlock.Models.DTOs.Request;

public record LoginRequestDto
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
