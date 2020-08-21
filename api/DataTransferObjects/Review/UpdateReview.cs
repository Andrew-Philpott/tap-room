using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.DataTransferObjects
{
  public class UpdateReview
  {
    [Required]
    public int Rating { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int BeerId { get; set; }
  }
}