
using System.Security.Cryptography;
using System.Text;
using TapRoomApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace TapRoomApi.Helpers
{
  public class TapRoomContext : DbContext
  {
    public TapRoomContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Beer> Beer { get; set; }
    public DbSet<User> Users { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      byte[] passwordHash;
      byte[] passwordSalt;

      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("test"));
      }

      base.OnModelCreating(builder);
      builder.Entity<User>().HasData(
      new User() { Id = 1, FirstName = "admin", LastName = "admin", UserName = "admin", Email = "admin@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt, Role = "admin" },
      new User() { Id = 2, FirstName = "employee", LastName = "employee", UserName = "employee", Email = "employee@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt, Role = "employee" },
      new User() { Id = 3, FirstName = "member", LastName = "member", UserName = "member", Email = "member@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt, Role = "member" }
      );

      builder.Entity<Beer>().HasData(
        new Beer() { Id = 1, Name = "Universale", Brand = "Fremont", Color = "Golden Caramel", Aroma = "Citrus, apple, Biscuit", Flavor = "Pine, orange, bready", Price = 5, Pints = 124, AlcoholContent = 5.6 },
        new Beer() { Id = 2, Name = "Interurban", Brand = "Fremont", Color = "Yellow amber", Aroma = "Orange, dank, juicy", Flavor = "Grapefruit, pine, honey", Price = 5, Pints = 20, AlcoholContent = 6.2 },
        new Beer() { Id = 3, Name = "Round Trip", Brand = "Rileys", Color = "Golden Caramel", Aroma = "Apple", Flavor = "Pine, apple", Price = 9, Pints = 124, AlcoholContent = 7.4 },
        new Beer() { Id = 4, Name = "Universale", Brand = "Fremont", Color = "Golden Caramel", Aroma = "Citrus, apple, Biscuit", Flavor = "Pine, orange, bready", Price = 5, Pints = 124, AlcoholContent = 5.6 },
        new Beer() { Id = 5, Name = "The Good Stuff", Brand = "Andy's", Color = "Golden Brown", Aroma = "Citrus, apple, Biscuit", Flavor = "Pine, orange, bready", Price = 12, Pints = 124, AlcoholContent = 10.0 }
      );

      #region Review
      builder.Entity<Review>().HasData(
        new Review() { Id = 1, Rating = 4, Description = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", UserId = 1, BeerId = 4 },
        new Review() { Id = 2, Rating = 3, Description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.", UserId = 2, BeerId = 3 },
        new Review() { Id = 3, Rating = 4, Description = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", UserId = 3, BeerId = 5 }
            );
      #endregion
    }
  }
}