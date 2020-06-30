using TapRoomApi.Entities;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Services
{
  public interface IReviewService : IServiceBase<Review>
  {
    Task<Review> GetReviewAsync(int id);
    Task<IEnumerable<Review>> GetReviewsAsync();
    void CreateReview(Review model);
    void UpdateReview(Review model);
    void DeleteReview(Review model);
  }

  public class ReviewService : ServiceBase<Review>,
  IReviewService
  {
    public ReviewService(TapRoomContext tapRoomContext) : base(tapRoomContext)
    {
    }

    public async Task<Review> GetReviewAsync(int id)
    {
      return await FindByCondition(x => x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Review>> GetReviewsAsync()
    {
      return await FindAll().ToListAsync();
    }

    public void CreateReview(Review model)
    {
      Create(model);
    }

    public void UpdateReview(Review model)
    {
      Update(model);
    }

    public void DeleteReview(Review model)
    {
      Delete(model);
    }
  }
}

