namespace TapRoomApi.DataTransferObjects
{
  public class ViewReview
  {
    public int Rating { get; set; }
    public string Description { get; set; }
    public ViewUser User { get; set; }
  }
}