using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class AuthenticateUser
  {
    [Required]
    public string UserName { get; set; }
    [Required]
    public string Password { get; set; }
  }
}