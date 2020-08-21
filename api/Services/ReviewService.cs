using System;
using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Services
{
  public interface IReviewService
  {
    Task<Review> FindAsync(int id);
    Task<IList<Review>> FindAllAsync();
    Task<(Review, string message)> Create(Review entity);
    Task<(Review, string message)> Update(int id, Review entity);
    Task<(Review, string message)> Delete(int id);
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
    public async Task<(Review, string message)> Create(Review model)
    {
      string result = ValidateModel(model);
      if (!string.IsNullOrEmpty(result))
        return (null, result);

      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return (model, null);
    }
    public async Task<(Review, string message)> Update(int id, Review model)
    {
      var entity = await _tapRoomContext.Review.FindAsync(id);
      if (entity == null) return (null, "User does not exist in the database.");

      string result = ValidateModel(model);
      if (!string.IsNullOrEmpty(result))
        return (null, result);

      _tapRoomContext.Update(model);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }
    public async Task<(Review, string message)> Delete(int id)
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