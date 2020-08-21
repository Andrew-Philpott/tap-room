using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.DataTransferObjects.V1;
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
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer createDTO)
    {
      if (createDTO == null)
        return BadRequest(new ErrorResponse(new ErrorModel("Name", "Beer cannot be null.")));

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new ErrorResponse(new ErrorModel("Admin", "You must have administrative privileges to create a beer")));

        var entityToCreate = _mapper.Map<Beer>(createDTO);
        var entity = await _beerService.CreateAsync(entityToCreate);

        if (entity != null)
          return BadRequest(new ErrorResponse(new ErrorModel("Name", "Beer cannot be null.")));

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer updateDTO)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var user = await _userService.FindAsync(currentUserId);
        if (user.Role != "admin")
          return BadRequest(new ErrorResponse(new ErrorModel(null, "You must have administrative privileges to create a beer")));

        if (updateDTO == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer cannot be null.")));

        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        _mapper.Map(updateDTO, entity);
        var updateEntity = _beerService.Update(entity);
        return Ok(updateEntity);
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
        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        var updatedEntity = _beerService.IncrementPintsByOne(entity);
        return Ok(updatedEntity);
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
        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        var updateEntity = _beerService.DecrementPintsByOne(entity);
        return Ok(updateEntity);
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
          return BadRequest(new ErrorResponse(new ErrorModel(null, "You must have administrative privileges to create a beer")));

        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        _beerService.Delete(entity);
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