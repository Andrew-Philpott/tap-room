using System.Text;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.Services;
using TapRoomApi.Models;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace TapRoomApi.Controllers.V1
{
  [ApiController]
  public class UsersController : ControllerBase
  {
    private IUserService _userService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public UsersController(IBeerService beerService, IReviewService reviewService, IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _mapper = mapper;
      _userService = userService;
      _appSettings = appSettings.Value;
    }
    #region users
    [AllowAnonymous]
    [HttpPost("api/v1/users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateUser model)
    {
      try
      {
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var (entity, message) = await _userService.AuthenticateAsync(model.Email, model.Password, key);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpPost("api/v1/users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      try
      {
        var entity = _mapper.Map<User>(model);
        var (newEntity, message) = await _userService.RegisterAsync(entity, model.Password);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok();
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("api/v1/users")]
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

    [HttpGet("api/v1/users/{id}")]
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

    [HttpPut("api/v1/users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser model)
    {
      if (model == null)
        return BadRequest(new { message = "User cannot be null." });
      try
      {
        var entity = _mapper.Map<User>(model);
        var (updatedEntity, message) = await _userService.UpdateAsync(id, entity, model.Password);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok(updatedEntity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("api/v1/users/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        var (entity, message) = await _userService.DeleteAsync(id);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion
  }
}

