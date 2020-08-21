using System;
using TapRoomApi.Entities;
using System.Threading.Tasks;
using TapRoomApi.Helpers;
using System.Collections.Generic;
using System.Linq;
using TapRoomApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Services
{
  public interface IBeerService
  {
    Task<Beer> FindAsync(int id);
    Task<IList<Beer>> FindAllAsync();
    Task<(Beer, ErrorResponse)> IncrementPintsByOneAsync(int id);
    Task<(Beer, ErrorResponse)> DecrementPintsByOneAsync(int id);
    Task<(Beer, ErrorResponse)> CreateAsync(Beer entity);
    Task<(Beer, ErrorResponse)> UpdateAsync(int id, Beer entity);
    Task<(Beer, ErrorResponse)> DeleteAsync(int id);
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
    public async Task<(Beer, ErrorResponse)> IncrementPintsByOneAsync(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, new ErrorResponse("Beer does not exist in the database."));

      entity.Pints += 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }
    public async Task<(Beer, ErrorResponse)> DecrementPintsByOneAsync(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, new ErrorResponse("Beer does not exist in the database."));

      entity.Pints -= 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return (entity, null);
    }

    public async Task<(Beer, ErrorResponse)> CreateAsync(Beer model)
    {
      var exists = await _tapRoomContext.Beer.FirstOrDefaultAsync(x => x.Name == model.Name && x.Brand == model.Brand);
      if (exists != null) return (null, new ErrorResponse("A beer with that name and brand already exists."));

      if (!ValidateModel(model)) return (null, new ErrorResponse("Invalid model."));

      await _tapRoomContext.AddAsync(model);
      await _tapRoomContext.SaveChangesAsync();
      return (model, null);
    }
    public async Task<(Beer, ErrorResponse)> UpdateAsync(int id, Beer model)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, new ErrorResponse("Beer does not exist in the database."));

      if (!ValidateModel(model)) return (null, new ErrorResponse("Invalid model."));

      _tapRoomContext.Update(model);
      _tapRoomContext.SaveChanges();
      return (model, null);
    }
    public async Task<(Beer, ErrorResponse)> DeleteAsync(int id)
    {
      var entity = await _tapRoomContext.Beer.FindAsync(id);
      if (entity == null) return (null, new ErrorResponse("Beer does not exist in the database."));

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