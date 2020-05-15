using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class UpdateUser
  {
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
  }
}