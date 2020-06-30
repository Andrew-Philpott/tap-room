using System.ComponentModel.DataAnnotations;


namespace TapRoomApi.Models
{
  public class RegisterUser
  {
    [Required]
    [StringLength(50, ErrorMessage = "First name can't be longer than 60 characters")]
    public string FirstName { get; set; }
    [Required]
    [StringLength(50, ErrorMessage = "Last name can't be longer than 60 characters")]
    public string LastName { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
  }
}