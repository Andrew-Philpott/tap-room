namespace TapRoomApi.DataTransferObjects.V1
{
  public class ViewReviewLike
  {
    public int ReviewLikeId { get; set; }
    public int ReviewId { get; set; }
    public string UserId { get; set; }
  }
}