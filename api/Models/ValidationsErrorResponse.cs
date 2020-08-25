using System.Collections.Generic;

namespace TapRoomApi.Models
{
  public class ValidationErrorResponse
  {
    public List<ValidationErrorModel> ValidationErrors { get; set; } = new List<ValidationErrorModel>();
    public ValidationErrorResponse() { }
    public ValidationErrorResponse(ValidationErrorModel error)
    {
      ValidationErrors.Add(error);
    }
  }
}
