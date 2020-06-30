using TapRoomApi.Entities;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Services
{
  public interface IBeerService : IServiceBase<Beer>
  {
    Task<Beer> GetBeerAsync(int id);
    Task<IEnumerable<Beer>> GetBeersAsync();
    Task IncrementBeerPints(int id);
    Task DecrementBeerPints(int id);
    void CreateBeer(Beer model);
    Task UpdateBeer(Beer model);
    Task DeleteBeer(int id);
  }
  public class BeerService : ServiceBase<Beer>,
  IBeerService
  {
    public BeerService(TapRoomContext tapRoomContext) : base(tapRoomContext)
    {
    }

    public async Task<Beer> GetBeerAsync(int id)
    {
      Beer model = await FindByCondition(x => x.Id == id).Include(review => review.Reviews).SingleOrDefaultAsync();
      if (model == null)
        throw new Exception("Beer does not exist");
      return model;
    }

    public async Task<IEnumerable<Beer>> GetBeersAsync()
    {
      return await FindAll().ToListAsync();
    }

    public async Task IncrementBeerPints(int id)
    {
      Beer model = await GetBeerAsync(id);
      model.Pints += 1;
      Update(model);
    }

    public async Task DecrementBeerPints(int id)
    {
      Beer model = await GetBeerAsync(id);
      model.Pints -= 1;
      Update(model);
    }

    public void CreateBeer(Beer model)
    {
      if (FindAll().Any(x => x.Name == model.Name && x.Brand == model.Brand))
        throw new Exception($"{model.Name} by {model.Brand} is already taken");
      Create(model);
    }

    public async Task UpdateBeer(Beer model)
    {
      Beer entity = await GetBeerAsync(model.Id);
      if (FindAll().Any(x => x.Name == model.Name && x.Brand == model.Brand))
        throw new Exception($"{model.Name} by {model.Brand} is already taken");
      Update(entity);
    }

    public async Task DeleteBeer(int id)
    {
      Beer entity = await GetBeerAsync(id);
      Delete(entity);
    }
  }
}
