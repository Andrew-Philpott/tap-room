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
    Beer IncrementPintsByOne(Beer entity);
    Beer DecrementPintsByOne(Beer entity);
    Task<Beer> CreateAsync(Beer entity);
    Beer Update(Beer entity);
    void Delete(Beer entity);
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
      var entities = await _tapRoomContext.Beer.AsQueryable().Include(x => x.Reviews).ThenInclude(x => x.User).ToListAsync();
      return entities;
    }
    public Beer IncrementPintsByOne(Beer entity)
    {
      entity.Pints += 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }
    public Beer DecrementPintsByOne(Beer entity)
    {
      entity.Pints -= 1;
      _tapRoomContext.Beer.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }

    public async Task<Beer> CreateAsync(Beer entity)
    {
      var exists = await _tapRoomContext.Beer.FirstOrDefaultAsync(x => x.Name == entity.Name && x.Brand == entity.Brand);
      if (exists != null) return null;

      await _tapRoomContext.AddAsync(entity);
      await _tapRoomContext.SaveChangesAsync();
      return entity;
    }
    public Beer Update(Beer entity)
    {
      _tapRoomContext.Update(entity);
      _tapRoomContext.SaveChanges();
      return entity;
    }
    public void Delete(Beer entity)
    {
      _tapRoomContext.Beer.Remove(entity);
      _tapRoomContext.SaveChanges();
    }
  }
}