using System.ComponentModel.DataAnnotations.Schema;

namespace TapRoomApi.Entities
{
  [Table("review")]
  public class Review
  {
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Description { get; set; }
    [ForeignKey(nameof(Beer))]
    public int BeerId { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}