using System;
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
  public class ReviewsController : ControllerBase
  {
    private IMapper _mapper;
    private IReviewService _reviewService;
    public ReviewsController(IReviewService reviewService, IMapper mapper)
    {
      _mapper = mapper;
      _reviewService = reviewService;
    }

    #region reviews
    [AllowAnonymous]
    [HttpGet("api/v1/reviews/{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
      try
      {
        var entity = await _reviewService.FindAsync(id);
        var viewDTO = _mapper.Map<ViewReview>(entity);
        return Ok(viewDTO);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpGet("api/v1/reviews")]
    public async Task<IActionResult> GetReviews()
    {
      try
      {
        var entities = await _reviewService.FindAllAsync();
        var viewDTOs = _mapper.Map<IEnumerable<ViewReview>>(entities);
        return Ok(viewDTOs);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("api/v1/reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview createDTO)
    {

      System.Console.WriteLine(createDTO);
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entityToCreate = _mapper.Map<Review>(createDTO);
        entityToCreate.UserId = currentUserId;
        var entity = await _reviewService.CreateAsync(entityToCreate);
        var viewDTO = _mapper.Map<ViewReview>(entity);
        return Ok(viewDTO);
      }
      catch (Exception ex)
      {
        System.Console.WriteLine(ex);
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/reviews/{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReview updateDTO)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _reviewService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        _mapper.Map(updateDTO, entity);
        var updateEntity = _reviewService.Update(entity);
        var viewDTO = _mapper.Map<ViewReview>(updateEntity);
        return Ok(viewDTO);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("api/v1/reviews/{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
      try
      {
        var entity = await _reviewService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ErrorResponse(new ErrorModel(null, "Beer does not exist in the database")));

        _reviewService.Delete(entity);
        var viewDTO = _mapper.Map<ViewReview>(entity);
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