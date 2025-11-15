using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using AccountCenter.Models;
using AccountCenter.Data;

namespace REST_Services
{
    public class Startup
    {
        private readonly string AllowReactApp = "AllowReactApp";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // ✅ Enable CORS for React frontend
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowReactApp,
                    builder =>
                    {
                        builder
                            //.WithOrigins("http://localhost:3000")
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                            
                    });
            });

            // Dependency Injection
            services.AddScoped<UserRepository>();
            services.AddScoped<User>();

            // Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "REST_Services",
                    Version = "v1"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "REST_Services v1"));
            //}

            app.UseHttpsRedirection();

            app.UseRouting();

            // ✅ Important: add before authorization
            app.UseCors(AllowReactApp);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
