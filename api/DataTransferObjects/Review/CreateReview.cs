using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class CreateReview
  {
    [Required]
    public int Rating { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int BeerId { get; set; }
  }
}