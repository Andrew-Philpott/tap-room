using TapRoomApi.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace TapRoomApi.Contracts
{
  public interface IReviewRepository : IRepositoryBase<Review>
  {
    Task<Review> GetReviewAsync(int id);
    Task<IEnumerable<Review>> GetReviewsAsync();
    void CreateReview(Review model);
    void UpdateReview(int id, Review model);
    void DeleteReview(int id);
  }
}