namespace BeatBlock.Models.DTOs.Request;

public class RegisterRequestDTO
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Alias { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}
