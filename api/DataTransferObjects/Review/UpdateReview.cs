using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateReview
  {
    [Required]
    public int Id { get; }
    [Required]
    public int Rating { get; set; }
    [Required]
    public string Description { get; set; }
  }
}