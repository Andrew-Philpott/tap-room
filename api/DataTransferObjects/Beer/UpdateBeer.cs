using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateBeer
  {
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(60, ErrorMessage = "Name can't be longer than 50 characters.")]
    public string Name { get; set; }
    [Required(ErrorMessage = "Brand is required.")]
    [StringLength(60, ErrorMessage = "Brand can't be longer than 50 characters.")]
    public string Brand { get; set; }
    [Required(ErrorMessage = "Color is required.")]
    [StringLength(60, ErrorMessage = "Color can't be longer than 30 characters.")]
    public string Color { get; set; }
    [Required(ErrorMessage = "Aroma is required.")]
    [StringLength(60, ErrorMessage = "Aroma can't be longer than 50 characters.")]
    public string Aroma { get; set; }
    [Required(ErrorMessage = "Flavor is required.")]
    [StringLength(60, ErrorMessage = "Flavor can't be longer than 50 characters.")]
    public string Flavor { get; set; }
    [Required(ErrorMessage = "# of pints must be between 0 and 100.")]
    [Range(0, 100)]
    public double Price { get; set; }
    [Required(ErrorMessage = "Alcohol content must be between 0 and 100.")]
    [Range(0, 100)]
    public double AlcoholContent { get; set; }
    [Required(ErrorMessage = "# of pints must be between 0 and 10000.")]
    [Range(0, 10000)]
    public int Pints { get; set; }
  }
}