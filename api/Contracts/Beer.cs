using TapRoomApi.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace TapRoomApi.Contracts
{
  public interface IBeerRepository : IRepositoryBase<Beer>
  {
    Task<Beer> GetBeerAsync(int id);
    Task<IEnumerable<Beer>> GetBeersAsync();
    Task IncrementBeerPints(int id);
    Task DecrementBeerPints(int id);
    void CreateBeer(Beer model);
    void UpdateBeer(Beer model);
    void DeleteBeer(Beer model);
  }
}