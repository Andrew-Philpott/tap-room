using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateReview
  {
    [Required(ErrorMessage = "Id is required")]
    public int Id { get; }
    [Required(ErrorMessage = "Rating is required")]
    [Range(0, 5)]
    public int Rating { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [StringLength(250, ErrorMessage = "Description can't be longer than 250 characters")]
    public string Description { get; set; }
  }
}