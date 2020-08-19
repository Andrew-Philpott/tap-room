using System;
using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Services
{
  public interface IBeerService
  {
    Task<Beer> FindAsync(int id);
    Task<IList<Beer>> FindAllAsync();
    Task<Beer> IncrementPintsByOne(int id);
    Task<Beer> DecrementPintsByOne(int id);
    Task<Beer> Create(Beer entity);
    Task<Beer> Update(int id, Beer entity);
    Task<Beer> Delete(int id);
  }
  public class BeerService : IBeerService
  {
    private TapRoomContext _tapRoomContext;
    public BeerService(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }
    public async Task<Beer> FindAsync(int id)
    {
      var entity = await _tapRoomContext.Beer.Include(x => x.Reviews).ThenInclude(x => x.User).Where(x => x.BeerId == id).SingleOrDefaultAsync();
      return entity;
    }
    public async Task<IList<Beer>> FindAllAsync()
    {
      var entities = await _tapRoomContext.Beer.Include(x => x.Reviews).ToListAsync();
      return entities;
    }
    public async Task<Beer> IncrementPintsByOne(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null)
        throw new Exception("Beer not found in database.");
      entity.Pints += 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }
    public async Task<Beer> DecrementPintsByOne(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null)
        throw new Exception("Beer not found in database.");
      entity.Pints -= 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }

    public async Task<Beer> Create(Beer model)
    {
      var exists = await _tapRoomContext.Beer.FirstOrDefaultAsync(x => x.Name == model.Name && x.Brand == model.Brand);
      if (exists != null)
        throw new ArgumentException($"{model.Name} by {model.Brand} is already taken.");

      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return model;
    }
    public async Task<Beer> Update(int id, Beer model)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null)
        throw new Exception("Beer not found in database.");

      _tapRoomContext.Update(model);
      _tapRoomContext.SaveChanges();
      return model;
    }
    public async Task<Beer> Delete(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null)
        throw new Exception("Beer not found in database.");
      _tapRoomContext.Beer.Remove(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }
  }
}