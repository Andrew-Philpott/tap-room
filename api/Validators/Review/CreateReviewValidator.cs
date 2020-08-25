using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class CreateReviewValidator : AbstractValidator<CreateReview>
  {
    public CreateReviewValidator()
    {
      RuleFor(x => x.Rating).InclusiveBetween(1, 5);
      RuleFor(x => x.Headline).NotEmpty().Matches("^[a-zA-Z0-9 '\".,]*$").Length(20, 80);
      RuleFor(x => x.Description).NotEmpty().Matches("^[a-zA-Z0-9 '\".,]*$").Length(50, 500);
      RuleFor(x => x.BeerId).NotEmpty();
    }
  }
}