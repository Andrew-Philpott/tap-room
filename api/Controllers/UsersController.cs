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
    #region Users
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
    public IActionResult Register([FromBody] RegisterUser model)
    {
      var user = _mapper.Map<User>(model);
      try
      {
        _db.User.CreateUser(user, model.Password);
        _db.SaveAsync();
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
      var users = _db.User.GetAllUsers();
      var model = _mapper.Map<IEnumerable<ViewUser>>(users);
      return Ok(model);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var user = _db.User.GetUserById(id);
      var model = _mapper.Map<ViewUser>(user);
      return Ok(model);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateUser model)
    {
      var user = _mapper.Map<User>(model);
      user.Id = id;

      try
      {
        _db.User.UpdateUser(user, model.Password);
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      _db.User.DeleteUser(id);
      return Ok();
    }
    #endregion

    #region beers
    [AllowAnonymous]
    [HttpGet("beers/{id}")]
    public async Task<IActionResult> GetBeer(int id)
    {
      return Ok(_mapper.Map<ViewBeer>(await _db.Beer.GetBeerAsync(id)));
    }
    [AllowAnonymous]
    [HttpGet("beers")]
    public async Task<IActionResult> GetBeers()
    {
      return Ok(_mapper.Map<IEnumerable<ViewBeer>>(await _db.Beer.GetBeersAsync()));
    }
    [AllowAnonymous]
    [HttpPost("beers")]
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer model)
    {
      try
      {
        if (model == null)
        {
          return BadRequest("Beer object is null");
        }
        if (!ModelState.IsValid)
        {
          return BadRequest("Invalid model object");
        }

        Beer entity = _mapper.Map<Beer>(model);
        _db.Beer.CreateBeer(entity);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error in CreateBeer action: {ex.Message}");
        return StatusCode(500, "Internal server error");
      }

    }
    [AllowAnonymous]
    [HttpPut("beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer model)
    {
      try
      {
        if (model == null)
        {
          _logger.LogError("Beer object sent from client is null.");
          return BadRequest("Beer object is null");
        }

        if (!ModelState.IsValid)
        {
          _logger.LogError("Invalid beer object sent from client.");
          return BadRequest("Invalid model object");
        }

        Beer entity = await _db.Beer.GetBeerAsync(id);
        if (entity == null)
        {
          _logger.LogError($"Beer with id: {id}, hasn't been found in db.");
          return NotFound();
        }

        _mapper.Map(model, entity);

        _db.Beer.UpdateBeer(entity);
        await _db.SaveAsync();

        return Ok();
      }
      catch (Exception ex)
      {
        _logger.LogError($"Something went wrong inside UpdateBeer action: {ex.Message}");
        return StatusCode(500, "Internal server error");
      }
    }
    [AllowAnonymous]
    [HttpPut("beers/increment/{id}")]
    public async Task<IActionResult> IncrementBeerPints(int id)
    {
      Beer model = await _db.Beer.GetBeerAsync(id);
      model.Pints += 1;
      _db.Beer.UpdateBeer(model);
      // if (model == null)
      // {
      //   _logger.LogError($"Beer with id: {id}, hasn't been found in db.");
      //   return NotFound();
      // }
      // await _db.Beer.IncrementBeerPints(id);
      await _db.SaveAsync();
      return Ok(model);
    }
    [AllowAnonymous]
    [HttpPut("beers/decrement/{id}")]
    public async Task<IActionResult> DecrementBeerPints(int id)
    {
      Beer model = await _db.Beer.GetBeerAsync(id);
      if (model == null)
      {
        _logger.LogError($"Beer with id: {id}, hasn't been found in db.");
        return NotFound();
      }
      await _db.Beer.DecrementBeerPints(id);
      await _db.SaveAsync();
      return Ok();
    }
    [AllowAnonymous]
    [HttpDelete("beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
      Beer model = await _db.Beer.GetBeerAsync(id);
      if (model == null)
      {
        return NotFound();
      }
      _db.Beer.DeleteBeer(model);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion

    #region reviews
    [HttpGet("reviews/{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
      return Ok(_mapper.Map<ViewReview>(await _db.Review.GetReviewAsync(id)));
    }
    [HttpGet("reviews")]
    public async Task<IActionResult> GetReviews()
    {
      return Ok(_mapper.Map<IEnumerable<ViewReview>>(await _db.Review.GetReviewsAsync()));
    }

    [HttpPost("reviews")]
    public void CreateReview([FromBody] CreateReview model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      Review entity = _mapper.Map<Review>(model);
      _db.Review.CreateReview(entity);
      _db.SaveAsync();
    }
    [HttpPut("reviews/{id}")]
    public IActionResult UpdateReview(int id, [FromBody] UpdateReview model)
    {
      Review entity = _mapper.Map<Review>(model);
      var currentUserId = int.Parse(User.Identity.Name);
      _db.Review.UpdateReview(id, entity);
      _db.SaveAsync();
      return Ok();
    }

    [HttpDelete("reviews/{id}")]
    public IActionResult DeleteReview(int id)
    {
      _db.Review.DeleteReview(id);
      _db.SaveAsync();
      return Ok();
    }
    #endregion
  }
}
