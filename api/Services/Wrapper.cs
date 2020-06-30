using TapRoomApi.Helpers;
using System.Threading.Tasks;

namespace TapRoomApi.Services
{

  public interface IServiceWrapper
  {
    IBeerService Beer { get; }
    IReviewService Review { get; }
    IUserService User { get; }
    Task SaveAsync();
  }
  public class ServiceWrapper : IServiceWrapper
  {
    private TapRoomContext _tapRoomContext;
    private IReviewService _review;
    private IBeerService _beer;
    private IUserService _user;

    public ServiceWrapper(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }

    public IReviewService Review
    {
      get
      {
        if (_review == null)
        {
          _review = new ReviewService(_tapRoomContext);
        }

        return _review;
      }
    }

    public IBeerService Beer
    {
      get
      {
        if (_beer == null)
        {
          _beer = new BeerService(_tapRoomContext);
        }

        return _beer;
      }
    }

    public IUserService User
    {
      get
      {
        if (_user == null)
        {
          _user = new UserService(_tapRoomContext);
        }

        return _user;
      }
    }
    public async Task SaveAsync()
    {
      await _tapRoomContext.SaveChangesAsync();
    }
  }
}