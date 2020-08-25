using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using TapRoomApi.Entities;
using TapRoomApi.DataTransferObjects.V1;
using TapRoomApi.Services;
using TapRoomApi.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TapRoomApi.Controllers.V1
{
  [ApiController]
  [Authorize]
  public class ReviewsController : ControllerBase
  {
    private IMapper _mapper;
    private IReviewService _reviewService;
    public ReviewsController(IReviewService reviewService, IMapper mapper)
    {
      _mapper = mapper;
      _reviewService = reviewService;
    }

    [AllowAnonymous]
    [HttpGet("api/v1/reviews/{id}")]
    public async Task<IActionResult> GetReview(int id)
    {
      try
      {
        var entity = await _reviewService.FindAsync(id);
        var view = _mapper.Map<ViewReview>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [AllowAnonymous]
    [HttpGet("api/v1/reviews")]
    public async Task<IActionResult> GetReviews()
    {
      try
      {
        var entities = await _reviewService.FindAllAsync();
        var view = _mapper.Map<IEnumerable<ViewReview>>(entities);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpGet("api/v1/reviews/me")]
    public async Task<IActionResult> GetMyReviews()
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

        var entities = await _reviewService.FindAllByUserIdAsync(userId);
        var view = _mapper.Map<IEnumerable<ViewReview>>(entities);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpPost("api/v1/reviews/like")]
    public async Task<IActionResult> CreateLike([FromBody] CreateReviewLike createDTO)
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        var entityToCreate = _mapper.Map<ReviewLike>(createDTO);
        entityToCreate.UserId = userId;
        var entity = await _reviewService.CreateReviewLikeAsync(entityToCreate);
        var view = _mapper.Map<ViewReviewLike>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpDelete("api/v1/reviews/like/{id}")]
    public async Task<IActionResult> DeleteLike(int id)
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

        var entity = await _reviewService.FindReviewLikeAsync(id, userId);
        _reviewService.DeleteReviewLike(entity);
        var view = _mapper.Map<ViewReviewLike>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }


    [HttpPost("api/v1/reviews")]
    public async Task<IActionResult> CreateReview([FromBody] CreateReview createDTO)
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        var nameClaim = HttpContext.User.FindFirst("name").Value;

        int indexOfSpace = nameClaim.IndexOf(" ");
        string firstLetter = nameClaim.Substring(0, 1);
        string lastName = nameClaim.Substring(indexOfSpace + 1, nameClaim.Length - (indexOfSpace + 1));
        string name = firstLetter + " " + lastName;

        var entityToCreate = _mapper.Map<Review>(createDTO);
        entityToCreate.UserId = userId;
        entityToCreate.Name = name;
        var entity = await _reviewService.CreateAsync(entityToCreate);
        var view = _mapper.Map<ViewReview>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpPut("api/v1/reviews/{id}")]
    public async Task<IActionResult> UpdateReview(int id, [FromBody] UpdateReview updateDTO)
    {
      try
      {
        if (id != updateDTO.ReviewId) return BadRequest();

        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        var nameClaim = HttpContext.User.FindFirst("name").Value;

        int indexOfSpace = nameClaim.IndexOf(" ");
        string firstLetter = nameClaim.Substring(0, 1);
        string lastName = nameClaim.Substring(indexOfSpace + 1, nameClaim.Length - (indexOfSpace + 1));
        string name = firstLetter + " " + lastName;

        var entity = await _reviewService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        if (entity.UserId != userId) return Forbid();

        _mapper.Map(updateDTO, entity);
        entity.UserId = userId;
        entity.Name = name;
        var updatedEntity = _reviewService.Update(entity);
        var view = _mapper.Map<ViewReview>(updatedEntity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }

    [HttpDelete("api/v1/reviews/{id}")]
    public async Task<IActionResult> DeleteReview(int id)
    {
      try
      {
        var userId = HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        var entity = await _reviewService.FindAsync(id);
        if (entity == null)
          return BadRequest(new ValidationErrorResponse(new ValidationErrorModel(null, "Beer does not exist in the database")));

        if (entity.UserId != userId) return Forbid();

        _reviewService.Delete(entity);
        var view = _mapper.Map<ViewReview>(entity);
        return Ok(view);
      }
      catch
      {
        return StatusCode(500);
      }
    }
  }
}