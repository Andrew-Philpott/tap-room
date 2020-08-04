using System.ComponentModel.DataAnnotations;

namespace TapRoomApi.Models
{
  public class ViewUser
  {
    [Required]
    public string UserName { get; set; }
  }
}