using TapRoomApi.Contracts;
using TapRoomApi.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using TapRoomApi.Entities;

namespace TapRoomApi.Repository
{
  public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
  {
    protected TapRoomContext TapRoomContext { get; set; }

    public RepositoryBase(TapRoomContext tapRoomContext)
    {
      this.TapRoomContext = tapRoomContext;
    }

    public IQueryable<T> FindAll()
    {
      return this.TapRoomContext.Set<T>().AsNoTracking();
    }
    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) => this.TapRoomContext.Set<T>().Where(expression).AsNoTracking();

    public void Create(T entity)
    {
      this.TapRoomContext.Set<T>().Add(entity);
    }
    public void Update(T entity)
    {
      this.TapRoomContext.Set<T>().Update(entity);
    }
    public void Delete(T entity)
    {
      this.TapRoomContext.Set<T>().Remove(entity);
    }
  }
}