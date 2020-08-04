namespace TapRoomApi.Entities
{
  public class Review
  {
    public int ReviewId { get; set; }
    public int Rating { get; set; }
    public string Description { get; set; }
    public virtual Beer Beer { get; set; }
    public int BeerId { get; set; }
    public virtual User User { get; set; }
    public int UserId { get; set; }
  }
}