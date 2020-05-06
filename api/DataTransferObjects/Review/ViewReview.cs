namespace TapRoomApi.Models
{
  public class ViewReview
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Rating { get; set; }
    public string Description { get; set; }
    public ViewBeer Beer { get; set; }
  }
}