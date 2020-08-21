using System.Collections.Generic;

namespace TapRoomApi.Models
{
  public class ErrorResponse
  {
    public List<ErrorModel> Errors { get; set; } = new List<ErrorModel>();
    public ErrorResponse() { }
    public ErrorResponse(ErrorModel error)
    {
      Errors.Add(error);
    }
  }
}
