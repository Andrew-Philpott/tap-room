using System.Collections.Generic;

namespace TapRoomApi.DataTransferObjects.V1
{
  public class ViewBeer
  {
    public int BeerId { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; }
    public string Color { get; set; }
    public string Aroma { get; set; }
    public string Flavor { get; set; }
    public double Price { get; set; }
    public double AlcoholContent { get; set; }
    public int Pints { get; set; }
    public virtual ICollection<ViewReview> Reviews { get; set; }
  }
}