using TapRoomApi.Helpers;
using TapRoomApi.Contracts;

namespace TapRoomApi.Repository
{
  public class RepositoryWrapper : IRepositoryWrapper
  {
    private TapRoomContext _tapRoomContext;
    private IReviewRepository _review;
    private IBeerRepository _beer;
    private IUserRepository _user;

    public RepositoryWrapper(TapRoomContext tapRoomContext)
    {
      _tapRoomContext = tapRoomContext;
    }

    public IReviewRepository Review
    {
      get
      {
        if (_review == null)
        {
          _review = new ReviewRepository(_tapRoomContext);
        }

        return _review;
      }
    }

    public IBeerRepository Beer
    {
      get
      {
        if (_beer == null)
        {
          _beer = new BeerRepository(_tapRoomContext);
        }

        return _beer;
      }
    }

    public IUserRepository User
    {
      get
      {
        if (_user == null)
        {
          _user = new UserRepository(_tapRoomContext);
        }

        return _user;
      }
    }
    public void Save()
    {
      _tapRoomContext.SaveChanges();
    }
  }
}