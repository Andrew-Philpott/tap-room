using System.Collections.Generic;

namespace TapRoomApi.Entities
{
  public class Beer
  {
    public int BeerId { get; set; }
    public string Brand { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }
    public string Aroma { get; set; }
    public string Flavor { get; set; }
    public double Price { get; set; }
    public double AlcoholContent { get; set; }
    public int Pints { get; set; }
    public string UserId { get; set; }
    public virtual ICollection<Review> Reviews { get; set; }
  }
}