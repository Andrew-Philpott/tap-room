using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using FluentValidation.AspNetCore;

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
      services.AddMvc(options => { options.EnableEndpointRouting = false; }).
      AddFluentValidation(mvcConfiguration => mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>()).AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
      services.AddAutoMapper(typeof(Startup));
      services.ConfigureJWTAuthentication(_configuration);
      services.ConfigureEntityServices();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseRouting();
      app.UseCors(options =>
      options.WithOrigins("http://localhost:3000")
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