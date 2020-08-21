using System;
using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TapRoomApi.Models;

namespace TapRoomApi.Services
{
  public interface IReviewService
  {
    Task<Review> FindAsync(int id);
    Task<IList<Review>> FindAllAsync();
    Task<(Review, ErrorResponse)> CreateAsync(Review entity);
    Task<(Review, ErrorResponse)> UpdateAsync(int id, Review entity);
    Task<(Review, ErrorResponse)> DeleteAsync(int id);
  }
  public class ReviewService : IReviewService
  {
    private TapRoomContext _tapRoomContext;
    public ReviewService(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }
    public async Task<Review> FindAsync(int id)
    {
      var entity = await _tapRoomContext.Review.SingleOrDefaultAsync();
      return entity;
    }
    public async Task<IList<Review>> FindAllAsync()
    {
      var entities = await _tapRoomContext.Review.ToListAsync();
      return entities;
    }
    public async Task<(Review, ErrorResponse)> CreateAsync(Review model)
    {
      string message = ValidateModel(model);
      if (!string.IsNullOrEmpty(message))
        return (null, new ErrorResponse(message));

      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return (model, null);
    }
    public async Task<(Review, ErrorResponse)> UpdateAsync(int id, Review model)
    {
      var entity = await _tapRoomContext.Review.FindAsync(id);
      if (entity == null) return (null, new ErrorResponse("User does not exist in the database."));

      string message = ValidateModel(model);
      if (!string.IsNullOrEmpty(message))
        return (null, new ErrorResponse(message));

      _tapRoomContext.Update(model);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }
    public async Task<(Review, ErrorResponse)> DeleteAsync(int id)
    {
      var entity = await _tapRoomContext.Review.FindAsync(id);
      if (entity == null)
        throw new AppException("Review not found in database.");
      _tapRoomContext.Review.Remove(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }

    public static string ValidateModel(Review model)
    {
      string message = String.Empty;
      if (model == null)
        message = "Review cannot be null.";
      if (!(model.Rating <= 5 && model.Rating >= 1))
        message = "Rating must be between 1 and 5.";
      if (!(model.Description.Length < 50))
        message = "Description must be greater than 50 characters.";
      if (!(model.Description.Length <= 500))
        message = "Description cannot exceed 500 characters.";

      return message;
    }
  }
}