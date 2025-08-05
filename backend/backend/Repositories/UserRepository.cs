using BeatBlock.Data;
using BeatBlock.Models;
using Microsoft.EntityFrameworkCore;

namespace BeatBlock.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context) => _context = context;

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.User.AnyAsync(u => u.Email == email);
    }

    public async Task<bool> IdExistsAsync(Guid id)
    {
        return await _context.User.AnyAsync(u => u.Id == id);
    }

    public async Task AddUserAsync(User user)
    {
        _context.User.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.User
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.User
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}
