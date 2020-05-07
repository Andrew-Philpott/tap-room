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

    public async Task IncrementBeerPints(int id)
    {
      Beer model = await FindByCondition(x => x.Id == id).SingleOrDefaultAsync();
      model.Pints += 1;
      UpdateBeer(model);
    }

    public async Task DecrementBeerPints(int id)
    {
      Beer model = await FindByCondition(x => x.Id == id).SingleOrDefaultAsync();
      model.Pints += 1;
      UpdateBeer(model);
    }

    public void CreateBeer(Beer model)
    {
      Create(model);
    }

    public void UpdateBeer(Beer model)
    {
      Update(model);
    }

    public void DeleteBeer(Beer model)
    {
      Delete(model);
    }
  }
}