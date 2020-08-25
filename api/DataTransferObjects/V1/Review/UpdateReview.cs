namespace TapRoomApi.DataTransferObjects.V1
{
  public class UpdateReview
  {
    public int ReviewId { get; set; }
    public int Rating { get; set; }
    public string Headline { get; set; }
    public string Description { get; set; }
    public int BeerId { get; set; }
  }
}