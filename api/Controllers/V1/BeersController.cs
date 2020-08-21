using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.DataTransferObjects;
using TapRoomApi.Services;
using TapRoomApi.Models;
using System.Threading.Tasks;

namespace TapRoomApi.Controllers.V1
{
  [ApiController]
  public class BeersController : ControllerBase
  {
    private IMapper _mapper;
    private IBeerService _beerService;
    private IUserService _userService;
    public BeersController(IBeerService beerService, IUserService userService, IMapper mapper)
    {
      _mapper = mapper;
      _beerService = beerService;
      _userService = userService;
    }

    #region beers
    [AllowAnonymous]
    [HttpGet("api/v1/beers/{id}")]
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
    [HttpGet("api/v1/beers")]
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

    [HttpPost("api/v1/beers")]
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new ErrorResponse("You must have administrative privileges to create a beer"));

        if (model == null)
          return BadRequest(new ErrorResponse("Beer cannot be null."));

        var entity = _mapper.Map<Beer>(model);
        var (newEntity, message) = await _beerService.CreateAsync(entity);

        if (message != null)
          return BadRequest(message);

        return Ok(newEntity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new ErrorResponse("You must have administrative privileges to create a beer"));

        if (model == null)
          return BadRequest(new ErrorResponse("Beer cannot be null."));

        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse("Beer does not exist in the database"));

        _mapper.Map(model, entity);
        var (updatedEntity, message) = await _beerService.UpdateAsync(id, entity);

        if (message != null)
          return BadRequest(message);

        return Ok(updatedEntity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/beers/increment/{id}")]
    public async Task<IActionResult> IncrementBeerPints(int id)
    {
      try
      {
        var (entity, message) = await _beerService.IncrementPintsByOneAsync(id);
        if (message != null)
          return BadRequest(message);

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/beers/decrement/{id}")]
    public async Task<IActionResult> DecrementBeerPints(int id)
    {
      try
      {
        var (entity, message) = await _beerService.DecrementPintsByOneAsync(id);
        if (message != null)
          return BadRequest(message);

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("api/v1/beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new ErrorResponse("You must have administrative privileges to create a beer"));

        var (entity, message) = await _beerService.DeleteAsync(id);
        if (message != null)
          return BadRequest(message);

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