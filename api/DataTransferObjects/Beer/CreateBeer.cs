using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class CreateBeer
  {
    public int BeerId { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Color { get; set; }
    [Required]
    public string Aroma { get; set; }
    [Required]
    public string Flavor { get; set; }
    [Required]
    public double Price { get; set; }
    [Required]
    public double AlcoholContent { get; set; }
    [Required]
    public int Pints { get; set; }
  }
}