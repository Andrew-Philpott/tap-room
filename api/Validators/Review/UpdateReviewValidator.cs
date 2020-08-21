using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class UpdateReviewValidator : AbstractValidator<UpdateReview>
  {
    public UpdateReviewValidator()
    {
      RuleFor(x => x.Rating).InclusiveBetween(1, 5);
      RuleFor(x => x.Description).NotEmpty().Matches("^[a-zA-Z0-9 '\".,]*$").Length(50, 500);
    }
  }
}