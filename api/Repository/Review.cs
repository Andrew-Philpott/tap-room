using TapRoomApi.Contracts;
using TapRoomApi.Entities;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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