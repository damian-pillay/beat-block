namespace BeatBlock.Models.DTOs.Response;

public class UserInfoDTO
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Alias { get; set; }
}
