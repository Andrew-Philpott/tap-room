using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.Services;
using TapRoomApi.Models;
using Microsoft.Extensions.Logging;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace TapRoomApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApiController : ControllerBase
  {
    private IBeerService _beerService;
    private IReviewService _reviewService;
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public ApiController(ILogger<ApiController> logger, IBeerService beerService, IReviewService reviewService, IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _mapper = mapper;
      _beerService = beerService;
      _reviewService = reviewService;
      _userService = userService;
      _appSettings = appSettings.Value;
    }
    #region users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateUser model)
    {
      try
      {
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var entity = await _userService.Authenticate(model.Email, model.Password, key);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [AllowAnonymous]
    [HttpPost("users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      try
      {
        var entity = _mapper.Map<User>(model);
        await _userService.Register(entity, model.Password);
        return Ok(model);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAll()
    {
      try
      {
        var entities = await _userService.FindAllAsync();
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
        var entity = await _userService.FindAsync(id);
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
        var entity = _mapper.Map<User>(model);
        await _userService.Update(id, entity, model.Password);
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
        await _userService.Delete(id);
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
        var entity = await _beerService.FindAsync(id);
        return Ok(entity);
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
        var entities = await _beerService.FindAllAsync();
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
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });

        if (model == null)
          return BadRequest(new { message = "Beer cannot be null." });

        var entity = _mapper.Map<Beer>(model);
        entity = await _beerService.Create(entity);
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
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });

        if (model == null)
          return BadRequest(new { message = "Beer cannot be null." });

        var entity = _mapper.Map<Beer>(model);
        var updatedEntity = await _beerService.Update(id, entity);
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
        var entity = await _beerService.IncrementPintsByOne(id);
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
        var entity = await _beerService.DecrementPintsByOne(id);
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
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new { message = "You must have administrative privileges to create a beer" });
        var entity = await _beerService.Delete(id);
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
        var entity = await _reviewService.FindAsync(id);
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
        var entities = await _reviewService.FindAllAsync();
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview model)
    {

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = _mapper.Map<Review>(model);
        entity.UserId = currentUserId;
        entity = await _reviewService.Create(entity);
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
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = _mapper.Map<Review>(model);
        await _reviewService.Update(id, entity);
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
        var entity = await _reviewService.Delete(id);
        return Ok(id);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion
  }
}

