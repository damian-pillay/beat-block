using System.Collections.Frozen;
using System.ComponentModel.DataAnnotations;
using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BeatBlock.Helpers;

public static class ProjectExceptionMap
{
    public static readonly (int StatusCode, string Title, string Detail, string TypeUrl) DefaultResponse =
        (StatusCodes.Status500InternalServerError,
         "Unexpected Error",
         "An unexpected error occurred while processing your request.",
         "https://tools.ietf.org/html/rfc7231#section-6.6.1");

    public static readonly FrozenDictionary<Type, (int StatusCode, string Title, string Detail, string TypeUrl)> ExceptionToResponse =
        new Dictionary<Type, (int, string, string, string)>
        {
            {
                typeof(ArgumentException),
                (StatusCodes.Status400BadRequest,
                    "Bad Request",
                    "One or more arguments provided were invalid.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.1")
            },
            {
                typeof(ArgumentNullException),
                (StatusCodes.Status400BadRequest,
                    "Bad Request",
                    "A required input was null or missing.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.1")
            },
            {
                typeof(InvalidDataException),
                (StatusCodes.Status400BadRequest,
                    "Invalid Data",
                    "The uploaded file is in an unsupported or corrupt format.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.1")
            },
            {
                typeof(UnauthorizedAccessException),
                (StatusCodes.Status401Unauthorized,
                    "Unauthorized",
                    "You do not have permission to access or modify this resource.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.3")
            },
            {
                typeof(ValidationException),
                (StatusCodes.Status400BadRequest,
                    "Validation Failed",
                    "One or more fields failed validation. Check the error details for more information.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.1")
            },
            {
                typeof(FileNotFoundException),
                (StatusCodes.Status404NotFound,
                    "File Not Found",
                    "The requested project file could not be found.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.4")
            },
            {
                typeof(KeyNotFoundException),
                (StatusCodes.Status404NotFound,
                    "Not Found",
                    "The project with the given ID does not exist.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.4")
            },
            {
                typeof(InvalidOperationException),
                (StatusCodes.Status409Conflict,
                    "Conflict",
                    "The request could not be completed due to a data conflict.",
                    "https://tools.ietf.org/html/rfc7231#section-6.5.8")
            },
            {
                typeof(TimeoutException),
                (StatusCodes.Status504GatewayTimeout,
                    "Timeout",
                    "The operation timed out while accessing project resources.",
                    "https://tools.ietf.org/html/rfc9110#section-15.8.6")
            },
            {
                typeof(IOException),
                (StatusCodes.Status500InternalServerError,
                    "I/O Error",
                    "An unexpected error occurred while accessing project storage.",
                    "https://tools.ietf.org/html/rfc7231#section-6.6.1")
            },
            {
                typeof(RequestFailedException),
                (StatusCodes.Status500InternalServerError,
                 "Blob Storage Error",
                 "An error occurred while accessing blob storage.",
                 "https://tools.ietf.org/html/rfc7231#section-6.6.1")
            },
            {
                typeof(SqlException),
                (StatusCodes.Status500InternalServerError,
                    "Database Error",
                    "An error occurred while accessing the database.",
                    "https://tools.ietf.org/html/rfc7231#section-6.6.1")
            },
            {
                typeof(DbUpdateException),
                (StatusCodes.Status500InternalServerError,
                 "Database Update Error",
                 "An error occurred while saving changes to the database.",
                 "https://tools.ietf.org/html/rfc7231#section-6.6.1")
            },
            {
                typeof(DbUpdateConcurrencyException),
                (StatusCodes.Status409Conflict,
                 "Concurrency Conflict",
                 "The resource was modified by another process. Please retry your operation.",
                 "https://tools.ietf.org/html/rfc7231#section-6.5.8")
            },            
            {
                typeof(Exception),
                (StatusCodes.Status429TooManyRequests,
                 "Too Many Requests",
                 "You have sent too many requests in a given amount of time. Please wait before retrying.",
                 "https://datatracker.ietf.org/doc/html/rfc6585#section-4")
            },
        }.ToFrozenDictionary();
}

