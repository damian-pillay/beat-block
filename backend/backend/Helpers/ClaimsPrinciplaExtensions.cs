using System.Security.Claims;

namespace BeatBlock.Helpers;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var id = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(id))
            throw new UnauthorizedAccessException("User ID claim is missing.");

        return Guid.Parse(id);
    }
}