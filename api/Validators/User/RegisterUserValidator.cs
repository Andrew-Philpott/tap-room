using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class RegisterUserValidator : AbstractValidator<RegisterUser>
  {
    public RegisterUserValidator()
    {
      RuleFor(x => x.FirstName).NotEmpty().Matches("^[a-zA-Z]*$").MaximumLength(50);
      RuleFor(x => x.LastName).NotEmpty().Matches("^[a-zA-Z]*$").MaximumLength(50);
      RuleFor(x => x.UserName).NotEmpty().Matches("^[a-zA-Z0-9]*$").MaximumLength(50);
      RuleFor(x => x.Email).EmailAddress();
      RuleFor(x => x.Password).NotEmpty().Matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{10,18}$");
    }
  }
}