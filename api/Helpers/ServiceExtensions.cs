using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TapRoomApi.Repository;
using TapRoomApi.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace TapRoomApi.Helpers
{
  public static class ServiceExtensions
  {
    public static void ConfigureMySqlContext(this IServiceCollection services, IConfiguration config)
    {
      var connectionString = config["ConnectionStrings:DefaultConnection"];
      services.AddDbContext<TapRoomContext>(o => o.UseMySql(connectionString));
    }
    public static void ConfigureRepositoryWrapper(this IServiceCollection services)
    {
      services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
    }
  }
}