using TapRoomApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Helpers
{
  public class TapRoomContext : DbContext
  {
    public TapRoomContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Review> Review { get; set; }
    public DbSet<Beer> Beer { get; set; }
    public DbSet<ReviewLike> ReviewLike { get; set; }
  }
}