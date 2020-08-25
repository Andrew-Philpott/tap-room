using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace TapRoomApi.Services
{
  public interface IReviewService
  {
    Task<ReviewLike> FindReviewLikeAsync(int id, string userId);
    Task<ReviewLike> CreateReviewLikeAsync(ReviewLike entity);
    void DeleteReviewLike(ReviewLike entity);
    Task<Review> FindAsync(int id);
    Task<IList<Review>> FindAllAsync();
    Task<IList<Review>> FindAllByUserIdAsync(string id);
    Task<Review> CreateAsync(Review entity);
    Review Update(Review entity);
    void Delete(Review entity);
  }
  public class ReviewService : IReviewService
  {
    private TapRoomContext _tapRoomContext;
    public ReviewService(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }

    public async Task<ReviewLike> FindReviewLikeAsync(int id, string userId)
    {
      var entity = await _tapRoomContext.ReviewLike.SingleOrDefaultAsync(x => x.ReviewLikeId == id && x.UserId == userId);
      return entity;
    }
    public async Task<ReviewLike> CreateReviewLikeAsync(ReviewLike entity)
    {
      await _tapRoomContext.ReviewLike.AddAsync(entity);
      await _tapRoomContext.SaveChangesAsync();
      return entity;
    }
    public void DeleteReviewLike(ReviewLike entity)
    {
      _tapRoomContext.ReviewLike.Remove(entity);
      _tapRoomContext.SaveChanges();
    }
    public async Task<Review> FindAsync(int id)
    {
      var entity = await _tapRoomContext.Review.Include(x => x.Likes).SingleOrDefaultAsync(x => x.ReviewId == id);
      return entity;
    }
    public async Task<IList<Review>> FindAllAsync()
    {
      var entities = await _tapRoomContext.Review.Include(x => x.Likes).ToListAsync();
      return entities;
    }
    public async Task<IList<Review>> FindAllByUserIdAsync(string id)
    {
      var entities = await _tapRoomContext.Review.Include(x => x.Likes).Include(x => x.Beer).Where(x => x.UserId == id).ToListAsync();
      return entities;
    }
    public async Task<Review> CreateAsync(Review entity)
    {
      await _tapRoomContext.AddAsync(entity);
      await _tapRoomContext.SaveChangesAsync();
      return entity;
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