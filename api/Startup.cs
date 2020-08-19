using Microsoft.AspNetCore.Builder;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using TapRoomApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
namespace TapRoomApi
{
  public class Startup
  {
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
      services.ConfigureSqlServerContext(_configuration);
      services.AddCors();
      services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
      services.AddAutoMapper(typeof(Startup));
      var appSettingsSection = _configuration.GetSection("AppSettings");
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
      services.AddScoped<IReviewService, ReviewService>();
      services.AddScoped<IBeerService, BeerService>();
      services.AddScoped<IUserService, UserService>();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseRouting();
      app.UseCors(options =>
      options.AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyMethod());

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}