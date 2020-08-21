using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class UpdateBeerValidator : AbstractValidator<UpdateBeer>
  {
    public UpdateBeerValidator()
    {
      RuleFor(x => x.Name).NotEmpty().Matches("^[a-zA-Z0-9 ']*$").Length(50);
      RuleFor(x => x.Brand).NotEmpty().Matches("^[a-zA-Z0-9 ']*$").Length(50);
      RuleFor(x => x.Color).NotEmpty().Matches("^[a-zA-Z ]*$").Length(50);
      RuleFor(x => x.Aroma).NotEmpty().Matches("^[a-zA-Z ]*$").Length(100);
      RuleFor(x => x.Flavor).NotEmpty().Matches("^[a-zA-Z ]*$").Length(100);
      RuleFor(x => x.Price).InclusiveBetween(0, 10000);
      RuleFor(x => x.AlcoholContent).InclusiveBetween(0, 100);
      RuleFor(x => x.Pints).InclusiveBetween(0, 10000);
    }
  }
}