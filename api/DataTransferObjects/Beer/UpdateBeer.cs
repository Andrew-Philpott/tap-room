using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateBeer
  {
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
    [Range(0, 100)]
    public double Price { get; set; }
    [Range(0, 100)]
    public double AlcoholContent { get; set; }
    [Range(0, 10000)]
    public int Pints { get; set; }
  }
}