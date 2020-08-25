namespace TapRoomApi.Entities
{
  public class ReviewLike
  {
    public int ReviewLikeId { get; set; }
    public int ReviewId { get; set; }
    public string UserId { get; set; }
  }
}