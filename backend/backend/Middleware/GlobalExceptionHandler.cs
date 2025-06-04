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

        httpContext.Response.StatusCode = 500;
        httpContext.Response.ContentType = "application/json";

        var (status, title, detail, type) =
            ProjectExceptionMap.ExceptionToResponse.TryGetValue(exception.GetType(), out var value)
            ? value
            : ProjectExceptionMap.DefaultResponse;

        var errorResponse = new
        {
            type = type,
            title = title,
            status = status,
            detail = detail, 
        };

        await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);
        return true;
    }
}
