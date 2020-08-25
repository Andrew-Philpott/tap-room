namespace TapRoomApi.DataTransferObjects.V1
{
  public class CreateReview
  {
    public int Rating { get; set; }
    public string Headline { get; set; }
    public string Description { get; set; }
    public int BeerId { get; set; }
  }
}