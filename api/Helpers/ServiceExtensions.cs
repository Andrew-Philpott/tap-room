using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TapRoomApi.Services;
using Microsoft.Extensions.DependencyInjection;

namespace TapRoomApi.Helpers
{
  public static class ServiceExtensions
  {
    public static void ConfigureSqlServerContext(this IServiceCollection services, IConfiguration config)
    {
      var connectionString = config["ConnectionStrings:DefaultConnection"];
      services.AddDbContext<TapRoomContext>(o => o.UseSqlServer(connectionString));
    }
    public static void ConfigureServiceWrapper(this IServiceCollection services)
    {
      services.AddScoped<IServiceWrapper, ServiceWrapper>();
    }
  }
}
