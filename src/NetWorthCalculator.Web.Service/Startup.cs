using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NetWorthCalculator.Core.BalanceSheets;
using NetWorthCalculator.Core.ExchangeRates;
using NetWorthCalculator.Core.Repositories;
using NetWorthCalculator.Web.Service.Exceptions;

namespace NetWorthCalculator.Web.Service
{
	public class Startup
    {
        private const string _defaultCorsPolicyName = "localhost";

        private const string _corsOrigins = "http://localhost:3000";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options => options.Filters.Add(new HttpResponseExceptionFilter()));

            // Configure CORS
            services.AddCors(
                options => options.AddPolicy(
                    _defaultCorsPolicyName,
                    builder => builder
                        .WithOrigins(_corsOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                )
            );

            services.AddHttpClient<IExchangeRatesService, ExchangeRatesService>();

            services.AddSingleton<IBalanceSheetRepository, BalanceSheetRepository>();

            services.AddTransient<IBalanceSheetManager, BalanceSheetManager>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(_defaultCorsPolicyName);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
