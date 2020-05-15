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
using TapRoomApi.Contracts;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TapRoomApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UsersController : ControllerBase
  {
    private IRepositoryWrapper _db;
    private readonly ILogger<UsersController> _logger;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public UsersController(ILogger<UsersController> logger, IRepositoryWrapper db, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _mapper = mapper;
      _db = db;
      _logger = logger;
      _appSettings = appSettings.Value;
    }
    #region users
    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody] AuthenticateUser model)
    {
      var user = _db.User.Authenticate(model.UserName, model.Password);
      if (user == null)
        return BadRequest(new { message = "Username or password is incorrect" });

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Name, user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var JWToken = tokenHandler.WriteToken(token);
      return Ok(new
      {
        Id = user.Id,
        Username = user.UserName,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Role = user.Role,
        Token = JWToken
      });
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      var user = _mapper.Map<User>(model);
      try
      {
        _db.User.CreateUser(user, model.Password);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      var entities = _db.User.GetAllUsers();
      var model = _mapper.Map<IEnumerable<ViewUser>>(entities);
      return Ok(model);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var entity = _db.User.GetUserById(id);
      if (entity == null)
        return BadRequest(new { message = "User does not exist in database" });

      var model = _mapper.Map<ViewUser>(entity);
      return Ok(model);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser model)
    {
      var entity = _mapper.Map<User>(model);
      entity.Id = id;

      try
      {
        _db.User.UpdateUser(entity, model.Password);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        _db.User.DeleteUser(id);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }

    }
    #endregion

    #region beers
    [AllowAnonymous]
    [HttpGet("beers/{id}")]
    public async Task<IActionResult> GetBeer(int id)
    {
      var entity = await _db.Beer.GetBeerAsync(id);
      if (entity == null)
        return BadRequest(new { message = "Beer does not exist in database" });

      var model = _mapper.Map<ViewBeer>(entity);
      return Ok(model);
    }

    [AllowAnonymous]
    [HttpGet("beers")]
    public async Task<IActionResult> GetBeers()
    {
      var entities = await _db.Beer.GetBeersAsync();
      var model = _mapper.Map<IEnumerable<ViewBeer>>(entities);
      return Ok(model);
    }

    [AllowAnonymous]
    [HttpPost("beers")]
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer model)
    {
      var entity = _mapper.Map<Beer>(model);
      try
      {
        _db.Beer.CreateBeer(entity);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }

    [HttpPut("beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer model)
    {
      var entity = _mapper.Map<Beer>(model);
      entity.Id = id;

      try
      {
        await _db.Beer.UpdateBeer(entity);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut("beers/increment/{id}")]
    public async Task<IActionResult> IncrementBeerPints(int id)
    {
      try
      {
        await _db.Beer.IncrementBeerPints(id);
        await _db.SaveAsync();
        return Ok(await _db.Beer.GetBeerAsync(id));
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }

    [HttpPut("beers/decrement/{id}")]
    public async Task<IActionResult> DecrementBeerPints(int id)
    {
      try
      {
        await _db.Beer.DecrementBeerPints(id);
        await _db.SaveAsync();
        return Ok(await _db.Beer.GetBeerAsync(id));
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }


    [HttpDelete("beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
      try
      {
        await _db.Beer.DeleteBeer(id);
        await _db.SaveAsync();
        return Ok(id);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }

    }
    #endregion


    #region reviews
    [AllowAnonymous]
    [HttpGet("reviews/{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
      var entity = await _db.Review.GetReviewAsync(id);
      if (entity == null)
        return BadRequest(new { message = "Review does not exist in database" });

      var model = _mapper.Map<ViewReview>(entity);
      return Ok(model);
    }

    [AllowAnonymous]
    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews()
    {
      return Ok(_mapper.Map<IEnumerable<ViewReview>>(await _db.Review.GetReviewsAsync()));
    }

    [HttpPost("reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = _mapper.Map<Review>(model);

      try
      {
        _db.Review.CreateReview(entity);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }

    [HttpPut("reviews/{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReview model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = _mapper.Map<Review>(model);
      entity.Id = id;
      entity.UserId = currentUserId;

      try
      {
        _db.Review.UpdateReview(entity);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("reviews/{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
      Review model = await _db.Review.GetReviewAsync(id);
      if (model == null)
      {
        return BadRequest(new { error = "Review does not exist in the database" });
      }
      _db.Review.DeleteReview(model);
      await _db.SaveAsync();
      return Ok(id);
    }
    #endregion
  }
}
