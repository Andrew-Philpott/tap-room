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
    Task<Review> CreateAsync(Review entity);
    Review Update(Review entity);
    void Delete(Review Entity);
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
    public async Task<Review> CreateAsync(Review model)
    {
      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return model;
    }
    public Review Update(Review entity)
    {
      _tapRoomContext.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }
    public void Delete(Review entity)
    {
      _tapRoomContext.Review.Remove(entity);
      _tapRoomContext.SaveChanges();
    }
  }
}