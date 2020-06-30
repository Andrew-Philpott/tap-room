using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateReview
  {
    [Required(ErrorMessage = "Rating must be between 1 and 5.")]
    [Range(1, 5)]
    public int Rating { get; set; }
    [Required(ErrorMessage = "Description is required.")]
    [StringLength(60, ErrorMessage = "Description can't be longer than 500 characters.")]
    public string Description { get; set; }
    [Required(ErrorMessage = "Beer Id is required.")]
    public int BeerId { get; set; }
  }
}