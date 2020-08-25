using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using TapRoomApi.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;

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
      services.ConfigureAuthentication(_configuration);
      services.ConfigureAuthorization();
      services.ConfigureMVCPipeline();
      services.ConfigureAzureSqlServerContext(_configuration);
      services.AddAutoMapper(typeof(Startup));
      services.ConfigureEntityServices();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseHttpsRedirection();
      app.UseRouting();
      app.UseCors();

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}