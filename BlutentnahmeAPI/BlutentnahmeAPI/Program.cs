using BlutentnahmeAPI.Data;
using BlutentnahmeAPI.Repository;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
builder.Services.AddDbContextFactory<BlutentnahmeDBContext>(options =>
options.UseMySQL(builder.Configuration.GetConnectionString("AzureDB")));
builder.Services.AddScoped<IAufträgeRepository, AufträgeRepository>();
builder.Services.AddScoped<IBlutprobenRepository, BlutprobenRepository>();
builder.Services.AddScoped<IPatientenRepository, PatientenRepository>();
builder.Services.AddScoped<IPersonalRepository, PersonalRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
