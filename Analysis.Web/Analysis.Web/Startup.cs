using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Analysis.Application.automapper;
using Analysis.Application.main;
using Analysis.Application.main.champion;
using Analysis.Application.main.generalData;
using Analysis.Application.main.match;
using Analysis.EF;
using Analysis.EF.entities;
using Analysis.EF.repositories;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace Analysis.Web
{
    public class Startup
    {
        IConfigurationRoot _config;
        private IHostingEnvironment _env;
        public IConfiguration _configuration { get; }
        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder()
                //konfiguracinis failas
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            _env = env;
            _config = builder.Build();
            _configuration = configuration;

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(x => x.AddProfile(new MappingsProfile()));

            services.AddDbContext<AnalysisContext>(options =>
            options.UseSqlServer(_configuration.GetConnectionString("LeagueDatabase")));

            services.AddScoped<IMatchRepository, MatchRepository>();
            services.AddScoped<IMatchService, MatchService>();

            services.AddScoped<IGeneralDataRepository, GeneralDataRepository>();
            services.AddScoped<IGeneralDataService, GeneralDataService>();

            services.AddScoped<IChampionRepository, ChampionRepository>();
            services.AddScoped<IChampionService, ChampionService>();

            services.AddCors();
            services.AddMvc();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder =>
                builder.WithOrigins("http://localhost:4200")
           .AllowAnyHeader()
           .AllowAnyMethod()
           .AllowCredentials());

            
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
    }
}
