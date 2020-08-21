namespace TapRoomApi.Models
{
  public class ErrorModel
  {
    public string Name { get; set; }
    public string ErrorMessage { get; set; }
    public ErrorModel(string name, string errorMessage)
    {
      Name = name;
      ErrorMessage = errorMessage;
    }
  }
}