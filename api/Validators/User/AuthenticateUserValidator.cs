using FluentValidation;
using TapRoomApi.DataTransferObjects.V1;

namespace TapRoomApi.Validators
{
  public class AuthenticateUserValidator : AbstractValidator<AuthenticateUser>
  {
    public AuthenticateUserValidator()
    {
      RuleFor(x => x.Email).EmailAddress();
      RuleFor(x => x.Password).NotEmpty().Matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{10,18}$");
    }
  }
}