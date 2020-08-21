namespace TapRoomApi.DataTransferObjects.V1
{
  public class UpdateUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
  }
}