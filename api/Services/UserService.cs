using System;
using System.Text;
using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace TapRoomApi.Services
{
  public class AuthenticatedUser
  {
    internal AuthenticatedUser(User user, string token)
    {
      this.UserId = user.UserId;
      this.FirstName = user.FirstName;
      this.LastName = user.LastName;
      this.Email = user.Email;
      this.UserName = user.UserName;
      this.Role = user.Role;
      this.Token = token;
    }
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
  }

  public interface IUserService
  {
    Task<User> Register(User model, string password);
    Task<AuthenticatedUser> Authenticate(string email, string password, byte[] key);
    Task<User> FindAsync(int id);
    Task<IList<User>> FindAllAsync();
    Task<User> Update(int id, User model, string password);
    Task Delete(int id);
  }
  public class UserService : IUserService
  {
    private TapRoomContext _tapRoomContext;
    public UserService(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }

    public async Task<User> Register(User model, string password)
    {
      if (string.IsNullOrWhiteSpace(model.FirstName) || string.IsNullOrWhiteSpace(model.LastName))
        throw new ArgumentException("First name and last name is required.");

      if (string.IsNullOrWhiteSpace(model.UserName) || string.IsNullOrWhiteSpace(password))
        throw new ArgumentException("Username and password is required.");

      if (string.IsNullOrWhiteSpace(model.Email))
        throw new ArgumentException("Email is required.");

      if (await _tapRoomContext.User.AnyAsync(x => x.UserName == model.UserName))
        throw new Exception($"Username {model.UserName} is already taken.");
      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      User entity = new User() { PasswordHash = passwordHash, PasswordSalt = passwordSalt, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email, UserName = model.UserName };

      await _tapRoomContext.User.AddAsync(entity);
      await _tapRoomContext.SaveChangesAsync();
      return model;
    }

    public async Task<AuthenticatedUser> Authenticate(string email, string password, byte[] key)
    {
      var entity = await _tapRoomContext.User.SingleOrDefaultAsync(x => x.Email == email);
      if (entity == null)
        throw new Exception("User not found in the database.");

      if (!VerifyPasswordHash(password, entity.PasswordHash, entity.PasswordSalt))
        throw new Exception("Email or password was incorrect.");

      var tokenHandler = new JwtSecurityTokenHandler();

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Name, entity.UserId.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      string JWToken = tokenHandler.WriteToken(token);

      return new AuthenticatedUser(entity, JWToken);
    }

    public async Task<User> FindAsync(int id)
    {
      var entity = await _tapRoomContext.User.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");

      return entity;
    }

    public async Task<IList<User>> FindAllAsync()
    {
      var entities = await _tapRoomContext.User.ToListAsync();
      return entities;
    }
    public async Task<User> Update(int id, User model, string password)
    {
      var entity = await _tapRoomContext.User.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");

      if (string.IsNullOrWhiteSpace(model.FirstName))
        throw new Exception("First name cannot be blank.");

      if (string.IsNullOrWhiteSpace(model.LastName))
        throw new Exception("Last name cannot be blank.");

      if (string.IsNullOrWhiteSpace(password))
        throw new Exception("Password cannot be blank.");

      if (!string.IsNullOrWhiteSpace(model.UserName) && model.UserName != entity.UserName)
      {
        if (await _tapRoomContext.User.AnyAsync(x => x.UserName == model.UserName))
        {
          throw new Exception("Username " + model.UserName + " is already taken.");
        }
      }

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);
      entity.PasswordHash = passwordHash;
      entity.PasswordSalt = passwordSalt;
      _tapRoomContext.User.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }

    public async Task Delete(int id)
    {
      var entity = await _tapRoomContext.User.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");
      _tapRoomContext.User.Remove(entity);
      _tapRoomContext.SaveChanges();
    }


    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or only whitespace.", "password");

      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
      }
    }

    private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
      if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
      if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

      using (var hmac = new HMACSHA512(storedSalt))
      {
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != storedHash[i]) return false;
        }
      }
      return true;
    }
  }
}