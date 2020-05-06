using AutoMapper;
using TapRoomApi.Entities;
using TapRoomApi.Models;

namespace TapRoomApi.Helpers
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      #region Beer
      CreateMap<Beer, ViewBeer>();

      CreateMap<CreateBeer, Beer>();

      CreateMap<UpdateBeer, Beer>();
      #endregion

      #region Review
      CreateMap<Review, ViewReview>();

      CreateMap<CreateReview, Review>();

      CreateMap<UpdateReview, Review>();
      #endregion

      #region User
      CreateMap<User, ViewUser>();

      CreateMap<RegisterUser, User>();

      CreateMap<UpdateUser, User>();
      #endregion
    }
  }
}