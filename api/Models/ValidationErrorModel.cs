namespace TapRoomApi.Models
{
  public class ValidationErrorModel
  {
    public string Name { get; set; }
    public string ErrorMessage { get; set; }
    public ValidationErrorModel(string name, string errorMessage)
    {
      Name = name;
      ErrorMessage = errorMessage;
    }
  }
}