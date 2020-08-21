using FluentValidation;
using TapRoomApi.DataTransferObjects;

namespace TapRoomApi.Validators
{
  public class UpdateReviewValidator : AbstractValidator<UpdateReview>
  {
    public UpdateReviewValidator()
    {
      RuleFor(x => x.Rating).InclusiveBetween(1, 5);
      RuleFor(x => x.Description).NotEmpty().Matches("^[a-zA-Z0-9 '\".,]*$").Length(50, 500);
      RuleFor(x => x.BeerId).NotEmpty();
    }
  }
}