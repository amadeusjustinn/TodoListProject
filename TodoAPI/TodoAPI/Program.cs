using Microsoft.EntityFrameworkCore;

using TodoAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TodoContext>(options =>
    {
        // Uncomment line below to use in-memory database
        options.UseInMemoryDatabase("MyInMemoryDb");
        // Uncomment line below to use local SQL server
        //options.UseSqlServer(
        //    "Server=(localdb)\\MSSqlLocalDb;Database=TodoDB;Trusted_Connection=True;MultipleActiveResultSets=True;"
        //);
    }
);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(
    options => options.WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
);

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
