namespace TapRoomApi.Models
{
  public class ErrorResponse
  {
    public string ErrorMessage { get; set; }
    public ErrorResponse(string message)
    {
      ErrorMessage = message;
    }
  }
}
