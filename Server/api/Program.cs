using bll.Functions;
using bll.Interfaces;
using dal.Functions;
using dal.Interfaces;
using dal.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(op => op.AddPolicy("allow", bu => { bu.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); }));
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<Trips2Context>(options => options.UseSqlServer("Server=.;Database=Trips2;TrustServerCertificate=True;Trusted_Connection=True;"));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddScoped(typeof(IOrderDal), typeof(OrderDal));
builder.Services.AddScoped(typeof(IOrderBll), typeof(OrderBll));

builder.Services.AddScoped(typeof(ITripDal), typeof(TripDal));
builder.Services.AddScoped(typeof(ITripBll), typeof(TripBll));

builder.Services.AddScoped(typeof(ITypesTripDal), typeof(TypesTripDal));
builder.Services.AddScoped(typeof(ITypesTripBll), typeof(TypesTripBll));

builder.Services.AddScoped(typeof(IUserDal), typeof(UserDal));
builder.Services.AddScoped(typeof(IUserBll), typeof(UserBll));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("allow");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
