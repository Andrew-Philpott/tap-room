using TapRoomApi.Entities;
using System.Collections.Generic;

namespace TapRoomApi.Contracts
{
  public interface IUserRepository : IRepositoryBase<User>
  {
    User Authenticate(string username, string password);
    IEnumerable<User> GetAllUsers();
    User GetUserById(int id);
    User CreateUser(User user, string password);
    void UpdateUser(User user, string password = null);
    void DeleteUser(int id);
  }
}