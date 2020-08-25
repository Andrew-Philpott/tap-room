using AutoMapper;
using TapRoomApi.Entities;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Helpers
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      #region Beer
      CreateMap<CreateBeer, Beer>();

      CreateMap<UpdateBeer, Beer>();

      CreateMap<Beer, ViewBeer>();
      #endregion

      #region Review
      CreateMap<Review, ViewReview>();

      CreateMap<CreateReview, Review>();

      CreateMap<UpdateReview, Review>();
      #endregion

      #region ReviewLike
      CreateMap<ReviewLike, ViewReviewLike>();

      CreateMap<CreateReviewLike, ReviewLike>();
      #endregion

    }
  }
}