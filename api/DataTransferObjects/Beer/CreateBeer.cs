using System.ComponentModel.DataAnnotations;
namespace TapRoomApi.Models
{
  public class CreateBeer
  {
    [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Brand is required")]
    [StringLength(50, ErrorMessage = "Brand can't be longer than 50 characters")]
    public string Brand { get; set; }

    [Required(ErrorMessage = "Color is required")]
    [StringLength(20, ErrorMessage = "Color can't be longer than 20 characters")]
    public string Color { get; set; }
    [Required(ErrorMessage = "Aroma is required")]
    [StringLength(50, ErrorMessage = "Aroma can't be longer than 50 characters")]
    public string Aroma { get; set; }
    [Required(ErrorMessage = "Flavor is required")]
    [StringLength(50, ErrorMessage = "Flavor can't be longer than 50 characters")]
    public string Flavor { get; set; }
    [Required(ErrorMessage = "Price is required")]
    public double Price { get; set; }
    [Required(ErrorMessage = "ABV is required")]
    [Range(0, 100)]
    public double AlcoholContent { get; set; }
    [Required(ErrorMessage = "Pints is required")]
    [Range(0, 10000)]
    public int Pints { get; set; }
  }
}