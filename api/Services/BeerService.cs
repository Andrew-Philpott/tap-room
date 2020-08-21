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
    Task<(Beer, string message)> IncrementPintsByOne(int id);
    Task<(Beer, string message)> DecrementPintsByOne(int id);
    Task<(Beer, string message)> Create(Beer entity);
    Task<(Beer, string message)> Update(int id, Beer entity);
    Task<(Beer, string message)> Delete(int id);
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
    public async Task<(Beer, string message)> IncrementPintsByOne(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, "Beer doesn't exist in the database.");

      entity.Pints += 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }
    public async Task<(Beer, string message)> DecrementPintsByOne(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, "Beer doesn't exist in the database.");

      entity.Pints -= 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }

    public async Task<(Beer, string message)> Create(Beer model)
    {
      var exists = await _tapRoomContext.Beer.FirstOrDefaultAsync(x => x.Name == model.Name && x.Brand == model.Brand);
      if (exists != null) return (null, "A beer with that name and brand already exists.");

      if (!ValidateModel(model)) return (null, "Invalid model.");

      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return (model, null);
    }
    public async Task<(Beer, string message)> Update(int id, Beer model)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, "Beer doesn't exist in the database.");

      if (!ValidateModel(model)) return (null, "Invalid model.");

      _tapRoomContext.Update(model);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }
    public async Task<(Beer, string message)> Delete(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, "Beer doesn't exist in the database.");

      _tapRoomContext.Beer.Remove(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }

    public static bool ValidateModel(Beer model)
    {
      if (model == null || model.Pints < 0 || model.Pints >= 10000 || model.AlcoholContent < 0 || model.AlcoholContent > 100 || model.Price < 0 || model.Price > 10000)
        return false;

      return true;
    }
  }
}