using System.Threading.Tasks;

namespace TapRoomApi.Contracts
{
  public interface IRepositoryWrapper
  {
    IBeerRepository Beer { get; }
    IReviewRepository Review { get; }
    IUserRepository User { get; }
    Task SaveAsync();
  }
}