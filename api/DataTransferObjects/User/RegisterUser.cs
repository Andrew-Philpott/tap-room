using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class RegisterUser
  {
    [Required(ErrorMessage = "First name is required")]
    [StringLength(20, ErrorMessage = "First name can't be longer than 20 characters")]
    public string FirstName { get; set; }
    [Required(ErrorMessage = "Last name is required")]
    [StringLength(20, ErrorMessage = "Last name can't be longer than 20 characters")]
    public string LastName { get; set; }
    [Required(ErrorMessage = "Username is required")]
    [StringLength(20, ErrorMessage = "Username can't be longer than 20 characters")]
    public string Username { get; set; }
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }

  }
}