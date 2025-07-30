using Microsoft.AspNetCore.Diagnostics;
using BeatBlock.Helpers;

namespace BeatBlock.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An unhandled exception occurred.");

        var (status, title, detail, type) =
            ProjectExceptionMap.ExceptionToResponse.TryGetValue(exception.GetType(), out var value)
            ? value
            : ProjectExceptionMap.DefaultResponse;

        httpContext.Response.StatusCode = status;
        httpContext.Response.ContentType = "application/problem+json";

        var problemDetails = new
        {
            type,
            title,
            status,
            detail,
            instance = httpContext.Request.Path
        };

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
