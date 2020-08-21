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
        var model = _mapper.Map<ViewReview>(entity);
        return Ok(model);
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
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("api/v1/reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview model)
    {

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = _mapper.Map<Review>(model);
        entity.UserId = currentUserId;
        var (newEntity, message) = await _reviewService.CreateAsync(entity);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("api/v1/reviews/{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReview model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = _mapper.Map<Review>(model);
        var (updatedEntity, message) = await _reviewService.UpdateAsync(id, entity);
        if (message != null)
          return BadRequest(new { message = message });

        return Ok(entity);
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
        var (entity, message) = await _reviewService.DeleteAsync(id);
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