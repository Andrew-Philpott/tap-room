using System;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.Models;
using Microsoft.Extensions.Logging;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApiController : ControllerBase
  {
    private TapRoomContext _db;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public ApiController(ILogger<ApiController> logger, TapRoomContext db, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _mapper = mapper;
      _db = db;
      _appSettings = appSettings.Value;
    }
    #region users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateUser model)
    {
      try
      {
        if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
          return BadRequest(new { message = "Not a valid email or password." });

        var entity = await _db.User.SingleOrDefaultAsync(x => x.Email == model.Email);

        if (entity == null || !VerifyPasswordHash(model.Password, entity.PasswordHash, entity.PasswordSalt))
          return BadRequest(new { message = "Email or password was incorrect." });

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.Name, entity.UserId.ToString())
          }),
          Expires = DateTime.UtcNow.AddDays(7),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var JWToken = tokenHandler.WriteToken(token);

        return Ok(new
        {
          UserId = entity.UserId,
          Username = entity.UserName,
          FirstName = entity.FirstName,
          LastName = entity.LastName,
          Role = entity.Role,
          Token = JWToken
        });
      }
      catch (Exception ex)
      {
        System.Console.WriteLine(ex.GetBaseException());
        return BadRequest(new { message = ex });
      }
    }

    [AllowAnonymous]
    [HttpPost("users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      try
      {
        if (await _db.User.AnyAsync(x => x.UserName == model.UserName))
          return BadRequest(new { message = $"Username {model.UserName} is already taken." });
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
        var user = _mapper.Map<User>(model);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        await _db.User.AddAsync(user);
        await _db.SaveChangesAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        System.Console.WriteLine(ex.GetBaseException());
        return BadRequest(new { message = ex });
      }
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAll()
    {
      try
      {
        var entities = await _db.User.ToListAsync();
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
        var entity = await _db.User.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "User does not exist in database" });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser model)
    {
      if (model == null)
        return BadRequest(new { message = "User cannot be null." });
      try
      {
        User entity = await _db.User.FindAsync(id);

        if (entity == null)
          return BadRequest(new { message = "User not found in database." });

        if (!string.IsNullOrWhiteSpace(model.UserName) && model.UserName != entity.UserName)
        {
          if (await _db.User.AnyAsync(x => x.UserName == model.UserName))
          {
            return BadRequest(new { message = "Username " + model.UserName + " is already taken." });
          }
        }

        _mapper.Map(model, entity);
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
        entity.PasswordHash = passwordHash;
        entity.PasswordSalt = passwordSalt;

        _db.User.Update(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        User entity = await _db.User.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "User not found in database." });

        _db.User.Remove(entity);
        await _db.SaveChangesAsync();
        return Ok();
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region beers
    [AllowAnonymous]
    [HttpGet("beers/{id}")]
    public async Task<IActionResult> GetBeer(int id)
    {
      try
      {
        var entity = await _db.Beer.Include(x => x.Reviews).ThenInclude(x => x.User).Where(x => x.BeerId == id).SingleOrDefaultAsync();

        if (entity == null)
          return BadRequest(new { message = "Beer not found in database." });

        var model = _mapper.Map<ViewBeer>(entity);
        return Ok(model);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpGet("beers")]
    public async Task<IActionResult> GetBeers()
    {
      try
      {
        var entities = await _db.Beer.Include(x => x.Reviews).ToListAsync();
        // var model = _mapper.Map<IList<ViewBeer>>(entities);
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("beers")]
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _db.User.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });

        if (model == null)
          return BadRequest(new { message = "Beer cannot be null." });

        var exists = await _db.Beer.FirstOrDefaultAsync(x => x.Name == model.Name && x.Brand == model.Brand);
        if (exists != null)
          return BadRequest(new { message = $"{model.Name} by {model.Brand} is already taken." });

        var entity = _mapper.Map<Beer>(model);
        await _db.Beer.AddAsync(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _db.User.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });

        if (model == null)
          return BadRequest(new { message = "Beer cannot be null." });

        var entity = await _db.Beer.FindAsync(id);
        if (entity == null)
          return NotFound(new { message = "Beer not found in database." });

        _mapper.Map(model, entity);
        _db.Beer.Update(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("beers/increment/{id}")]
    public async Task<IActionResult> IncrementBeerPints(int id)
    {
      try
      {
        Beer entity = await _db.Beer.FindAsync(id);
        if (entity == null)
          return NotFound(new { message = "Beer not found in database." });
        entity.Pints += 1;

        _db.Beer.Update(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("beers/decrement/{id}")]
    public async Task<IActionResult> DecrementBeerPints(int id)
    {
      try
      {
        Beer entity = await _db.Beer.FindAsync(id);
        if (entity == null)
          return NotFound(new { message = "Beer not found in database." });
        entity.Pints -= 1;

        _db.Beer.Update(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _db.User.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });
        Beer entity = await _db.Beer.FindAsync(id);
        if (entity == null)
          return NotFound(new { message = "Beer not found in database." });

        _db.Beer.Remove(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion


    #region reviews
    [AllowAnonymous]
    [HttpGet("reviews/{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
      try
      {
        var entity = await _db.Review.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "Review does not exist in database" });

        var model = _mapper.Map<ViewReview>(entity);
        return Ok(model);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews()
    {
      try
      {
        return Ok(_mapper.Map<IEnumerable<ViewReview>>(await _db.Review.ToListAsync()));
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview model)
    {
      string message = String.Empty;
      if (model == null)
        message = "Review cannot be null.";
      if (!(model.Rating <= 5 && model.Rating >= 1))
        message = "Rating must be between 1 and 5.";
      if (model.Description.Length < 50)
        message = "Description must be greater than 50 characters.";
      if (model.Description.Length > 500)
        message = "Description cannot exceed 500 characters.";

      System.Console.WriteLine(message);
      if (!string.IsNullOrEmpty(message))
        return BadRequest(new { message = message });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = _mapper.Map<Review>(model);
        entity.UserId = currentUserId;

        await _db.Review.AddAsync(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("reviews/{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReview model)
    {
      string message = String.Empty;
      if (model == null)
        message = "Review cannot be null.";
      if (!(model.Rating <= 5 && model.Rating >= 1))
        message = "Rating must be between 1 and 5.";
      if (!(model.Description.Length < 50))
        message = "Description must be greater than 50 characters.";
      if (!(model.Description.Length <= 500))
        message = "Description cannot exceed 500 characters.";
      if (!string.IsNullOrEmpty(message))
        return BadRequest(new { message = message });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        Review entity = await _db.Review.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "Review not found in the database." });

        _mapper.Map(model, entity);
        entity.UserId = currentUserId;
        _db.Review.Update(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("reviews/{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
      try
      {
        Review entity = await _db.Review.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "Review not found in the database." });

        _db.Review.Remove(entity);
        await _db.SaveChangesAsync();
        return Ok(id);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion


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
