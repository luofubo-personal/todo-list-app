using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using System;
using System.Collections.Generic;

namespace TodoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Configure database based on environment
            if (builder.Environment.IsDevelopment())
            {
                // Use InMemory database for development
                builder.Services.AddDbContext<TodoContext>(options =>
                    options.UseInMemoryDatabase("TodoList"));
            }
            else
            {
                // Use SQL Server for production
                var connectionString = builder.Configuration.GetConnectionString("TodoContext");
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("Connection string 'TodoContext' not found.");
                }

                builder.Services.AddDbContext<TodoContext>(options =>
                    options.UseSqlServer(connectionString));
            }

            // Add health checks
            builder.Services.AddHealthChecks();

            builder.Services.AddControllers();

            // Add CORS services with specific origins
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins",
                    corsBuilder =>
                    {
                        var allowedOrigins = new List<string>
                        {
                            "http://localhost:4200",  // Angular dev server
                            "https://localhost:4200", // Angular dev server HTTPS
                            "http://localhost:3000",  // Alternative dev port
                            "https://localhost:3000", // Alternative dev port HTTPS
                            "http://localhost:61717", // Current Angular dev server port
                            "https://localhost:61717" // Current Angular dev server port HTTPS
                        };

                        // Add production origins from configuration
                        var configuredOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
                        if (configuredOrigins != null)
                        {
                            allowedOrigins.AddRange(configuredOrigins);
                        }

                        corsBuilder.WithOrigins(allowedOrigins.ToArray())
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials(); // Allow credentials for better security
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // Enable CORS with specific origins
            app.UseCors("AllowSpecificOrigins");

            app.UseAuthorization();

            app.MapControllers();
            app.MapHealthChecks("/health");

            app.Run();
        }
    }
}