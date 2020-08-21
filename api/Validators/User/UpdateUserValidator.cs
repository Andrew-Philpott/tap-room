using FluentValidation;
using TapRoomApi.DataTransferObjects;

namespace TapRoomApi.Validators
{
  public class UpdateUserValidator : AbstractValidator<UpdateUser>
  {
    public UpdateUserValidator()
    {
      RuleFor(x => x.FirstName).NotEmpty().Matches("^[a-zA-Z]*$").Length(50);
      RuleFor(x => x.LastName).NotEmpty().Matches("^[a-zA-Z]*$").Length(50);
      RuleFor(x => x.UserName).NotEmpty().Matches("^[a-zA-Z0-9]*$").Length(50);
      RuleFor(x => x.Email).EmailAddress();
      RuleFor(x => x.Password).NotEmpty().Matches("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{10,18}$");
    }
  }
}