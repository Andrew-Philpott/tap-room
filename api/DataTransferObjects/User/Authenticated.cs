using TapRoomApi.Entities;

namespace TapRoomApi.Models
{
  public class Authenticated
  {
    public Authenticated(User user, string token)
    {
      this.UserId = user.UserId;
      this.Username = user.UserName;
      this.FirstName = user.FirstName;
      this.LastName = user.LastName;
      this.Role = user.Role;
      this.Token = token;
    }
    public int UserId;
    private string Username;
    private string FirstName;
    private string LastName;
    private string Role;
    private string Token;
  }
}

