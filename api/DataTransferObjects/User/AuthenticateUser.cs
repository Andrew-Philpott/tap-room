using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class AuthenticateUser
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }
}