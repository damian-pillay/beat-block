using BeatBlock.Models;

namespace BeatBlock.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task AddUserAsync(User user);
    Task<bool> EmailExistsAsync(string email);
    Task<bool> IdExistsAsync(Guid id);
}
