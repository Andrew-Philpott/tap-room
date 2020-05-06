using TapRoomApi.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace TapRoomApi.Contracts
{
  public interface IBeerRepository : IRepositoryBase<Beer>
  {
    Task<Beer> GetBeerAsync(int id);
    Task<IEnumerable<Beer>> GetBeersAsync();
    void CreateBeer(Beer model);
    void UpdateBeer(int id, Beer model);
    void DeleteBeer(int id);
  }
}