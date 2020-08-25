using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.DataTransferObjects.V1;
using TapRoomApi.Services;
using TapRoomApi.Models;
using System.Threading.Tasks;

namespace TapRoomApi.Controllers.V1
{
  [ApiController]
  [Authorize(AuthenticationSchemes = "AzureAd")]
  public class BeersController : ControllerBase
  {
    private IMapper _mapper;
    private IBeerService _beerService;
    public BeersController(IBeerService beerService, IMapper mapper)
    {
      _mapper = mapper;
      _beerService = beerService;
    }

    [HttpGet("api/v1/beers")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBeers()
    {
      try
      {
        var entities = await _beerService.FindAllAsync();
        var view = _mapper.Map<IEnumerable<ViewBeer>>(entities);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpGet("api/v1/beers/{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBeer(int id)
    {
      try
      {
        var entities = await _beerService.FindAsync(id);
        var view = _mapper.Map<ViewBeer>(entities);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }


    [HttpPost("api/v1/beers")]
    public async Task<IActionResult> CreateBeer([FromBody] CreateBeer createDTO)
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

        if (createDTO == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel("Name", "Beer cannot be null.")));

        var entityToCreate = _mapper.Map<Beer>(createDTO);
        entityToCreate.UserId = userId;
        var entity = await _beerService.CreateAsync(entityToCreate);
        var view = _mapper.Map<ViewBeer>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpPut("api/v1/beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, [FromBody] UpdateBeer updateDTO)
    {
      try
      {
        if (id != updateDTO.BeerId) return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer id doesn't match.")));

        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        _mapper.Map(updateDTO, entity);
        var updatedEntity = _beerService.Update(entity);
        var view = _mapper.Map<ViewBeer>(updatedEntity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpDelete("api/v1/beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
      try
      {
        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        _beerService.Delete(entity);
        var view = _mapper.Map<ViewBeer>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpPut("api/v1/beers/increment/{id}")]
    public async Task<IActionResult> IncrementBeerPints(int id)
    {
      try
      {
        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        var updatedEntity = _beerService.IncrementPintsByOne(entity);
        var view = _mapper.Map<ViewBeer>(updatedEntity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpPut("api/v1/beers/decrement/{id}")]
    public async Task<IActionResult> DecrementBeerPints(int id)
    {
      try
      {
        var entity = await _beerService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        var updatedEntity = _beerService.DecrementPintsByOne(entity);
        var view = _mapper.Map<ViewBeer>(updatedEntity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }
  }
}