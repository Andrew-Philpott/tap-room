using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class CreateReview
  {
    [Required(ErrorMessage = "Rating is required")]
    public int Rating { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [StringLength(60, ErrorMessage = "Description can't be longer than 250 characters")]
    public string Description { get; set; }
    [Required(ErrorMessage = "Beer is required")]
    public int BeerId { get; set; }
  }
}