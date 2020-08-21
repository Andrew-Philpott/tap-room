using System.Text;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.Services;
using TapRoomApi.Models;
using TapRoomApi.DataTransferObjects.V1;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;

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
        var entity = await _userService.AuthenticateAsync(model.Email, model.Password, key);
        if (entity == null) return BadRequest(new ErrorResponse(new ErrorModel(null, "User does not exist or email password combination is incorrect.")));

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpPost("api/v1/users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser createDTO)
    {
      try
      {
        var entityToCreate = _mapper.Map<User>(createDTO);
        var entity = await _userService.RegisterAsync(entityToCreate, createDTO.Password);
        if (entity == null) return BadRequest(new ErrorResponse(new ErrorModel(null, $"Username {createDTO.UserName} is already taken.")));
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
        var viewDTOs = _mapper.Map<IEnumerable<ViewUser>>(entities);
        return Ok(viewDTOs);
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
        var viewDTO = _mapper.Map<ViewUser>(entity);
        return Ok(viewDTO);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/users/{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUser updateDTO)
    {
      if (updateDTO == null)
        return BadRequest(new ErrorResponse(new ErrorModel(null, "User cannot be null")));
      try
      {
        var entity = await _userService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "User does not exist in the database")));

        _mapper.Map(updateDTO, entity);
        var updateEntity = await _userService.UpdateAsync(
        entity, updateDTO.Password);
        if (updateEntity == null) return BadRequest(new ErrorResponse(new ErrorModel(null, "Username " + updateDTO.UserName + " is already taken.")));
        var viewDTO = _mapper.Map<ViewUser>(updateEntity);
        return Ok(viewDTO);
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
        var entity = await _userService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "User does not exist in the database")));

        var viewDTO = _mapper.Map<ViewUser>(entity);
        return Ok(viewDTO);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion
  }
}

