namespace BeatBlock.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = string.Empty;

    public string? Alias { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
