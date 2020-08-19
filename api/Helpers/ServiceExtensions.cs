using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TapRoomApi.Services;

namespace TapRoomApi.Helpers
{
  public static class ServiceExtensions
  {
    public static void ConfigureSqlServerContext(this IServiceCollection services, IConfiguration config)
    {
      var connectionString = config["ConnectionStrings:DefaultConnection"];
      services.AddDbContext<TapRoomContext>(o => o.UseSqlServer(connectionString));

    }

    public static void ConfigureJWTAuthentication(this IServiceCollection services, IConfiguration config)
    {
      var appSettingsSection = config.GetSection("AppSettings");
      services.Configure<AppSettings>(appSettingsSection);

      var appSettings = appSettingsSection.Get<AppSettings>();
      var key = Encoding.ASCII.GetBytes(appSettings.Secret);

      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.Events = new JwtBearerEvents
        {
          OnTokenValidated = async context =>
                {
                  var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                  var userId = int.Parse(context.Principal.Identity.Name);
                  var user = await userService.FindAsync(userId);
                  if (user == null)
                  {
                    context.Fail("Unauthorized");
                  }
                }
        };
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

    }

    public static void ConfigureEntityServices(this IServiceCollection services)
    {
      services.AddScoped<IReviewService, ReviewService>();
      services.AddScoped<IBeerService, BeerService>();
      services.AddScoped<IUserService, UserService>();
    }
  }
}
