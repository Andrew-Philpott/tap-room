using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TapRoomApi.Services;
using Microsoft.AspNetCore.Authorization;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace TapRoomApi.Helpers
{
  public static class ServiceExtensions
  {
    public static void ConfigureAzureSqlServerContext(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddDbContext<TapRoomContext>(o => o.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
    }
    public static void ConfigureEntityServices(this IServiceCollection services)
    {
      services.AddScoped<IReviewService, ReviewService>();
      services.AddScoped<IBeerService, BeerService>();
    }
    public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(options =>
        {
          configuration.Bind("AzureAdB2C", options);
          options.TokenValidationParameters.NameClaimType = "name";
        },
        options =>
        {
          configuration.Bind("AzureAdB2C", options);
        }, "AzureAdB2C");
      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                     .AddMicrosoftIdentityWebApi(options =>
             {
               configuration.Bind("AzureAd", options);
               options.TokenValidationParameters.NameClaimType = "name";
             },
             options =>
             {
               configuration.Bind("AzureAd", options);
             }, "AzureAd");
    }
    public static void ConfigureAuthorization(this IServiceCollection services)
    {
      services.AddAuthorization(options =>
      {
        var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder("AzureAdB2C",
                "AzureAd");
        defaultAuthorizationPolicyBuilder =
            defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
        options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
      });
    }
    public static void ConfigureMVCPipeline(this IServiceCollection services)
    {
      services.AddMvc(options => { options.EnableEndpointRouting = false; }).
      AddFluentValidation(mvcConfiguration => mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>()).AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
      services.AddCors(o => o.AddDefaultPolicy(builder =>
       {
         builder.WithOrigins("https://taproom.azurewebsites.net").AllowAnyHeader().AllowAnyMethod().WithExposedHeaders("WWW-Authenticate");
       }));
    }
  }
}
