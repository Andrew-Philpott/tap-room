namespace TapRoomApi.DataTransferObjects.V1
{
  public class UpdateReview
  {
    public int Rating { get; set; }
    public string Description { get; set; }
    public int BeerId { get; set; }
  }
}