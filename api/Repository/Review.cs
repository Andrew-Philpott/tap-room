using TapRoomApi.Contracts;
using TapRoomApi.Entities;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Repository
{
  public class ReviewRepository : RepositoryBase<Review>,
  IReviewRepository
  {
    public ReviewRepository(TapRoomContext tapRoomContext) : base(tapRoomContext)
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

    public void UpdateReview(int id, Review update)
    {
      var model = GetReviewAsync(id);
      if (model == null)
        throw new System.Exception($"No Review");
      Update(update);
    }

    public async void DeleteReview(int id)
    {
      Review model = await GetReviewAsync(id);
      if (model != null)
        Delete(model);
    }
  }
}