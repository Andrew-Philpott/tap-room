using TapRoomApi.Contracts;
using TapRoomApi.Entities;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Repository
{
  public class BeerRepository : RepositoryBase<Beer>,
  IBeerRepository
  {
    public BeerRepository(TapRoomContext tapRoomContext) : base(tapRoomContext)
    {
    }

    public async Task<Beer> GetBeerAsync(int id)
    {
      return await FindByCondition(x => x.Id == id).Include(review => review.Reviews).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Beer>> GetBeersAsync()
    {
      return await FindAll().ToListAsync();
    }

    public void CreateBeer(Beer model)
    {
      Create(model);
    }

    public void UpdateBeer(int id, Beer update)
    {
      var model = GetBeerAsync(id);
      if (model == null)
        throw new System.Exception($"No Beer");
      Update(update);
    }

    public async void DeleteBeer(int id)
    {
      Beer model = await GetBeerAsync(id);
      if (model != null)
        Delete(model);
    }
  }
}