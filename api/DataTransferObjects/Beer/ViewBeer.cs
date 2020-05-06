using System.Collections.Generic;

namespace TapRoomApi.Models
{
  public class ViewBeer
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public string Aroma { get; set; }
    public string Flavor { get; set; }
    public double Price { get; set; }
    public double AlcoholContent { get; set; }
    public int Pints { get; set; }
    public IEnumerable<ViewReview> Reviews { get; set; }
  }
}
