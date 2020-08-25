using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class CreateReviewLikeValidator : AbstractValidator<CreateReviewLike>
  {
    public CreateReviewLikeValidator()
    {
      RuleFor(x => x.ReviewId).NotEmpty();
    }
  }
}