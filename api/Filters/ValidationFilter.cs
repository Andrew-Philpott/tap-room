using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TapRoomApi.Filters
{
  public class ErrorModel
  {
    public string Name { get; set; }
    public string ErrorMessage { get; set; }
    public ErrorModel(string name, string errorMessage)
    {
      Name = name;
      ErrorMessage = errorMessage;
    }
  }
  public class ErrorResponse
  {
    public List<ErrorModel> Errors { get; set; } = new List<ErrorModel>();
    public ErrorResponse() { }
    public ErrorResponse(ErrorModel error)
    {
      Errors.Add(error);
    }
  }
  public class ValidationFilter : IAsyncActionFilter
  {
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      if (!context.ModelState.IsValid)
      {
        var modelSateErrors = context.ModelState.Where(x => x.Value.Errors.Count > 0).ToDictionary(x => x.Key, x => x.Value.Errors.Select(x => x.ErrorMessage));

        var errorResponse = new ErrorResponse() { };

        foreach (var error in modelSateErrors)
        {
          foreach (var item in error.Value)
          {
            errorResponse.Errors.Add(new ErrorModel(error.Key, item));
          }
        }

        context.Result = new BadRequestObjectResult(errorResponse);
        return;
      }

      await next();
    }
  }
}