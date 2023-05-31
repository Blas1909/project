using ApiProyecto.Models;
using ApiProyecto.Services;
using ApiProyecto.Helpers;
using Base.Data;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.Features;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//cambiar idioma a ingles para que JSON acepte el punuto y el precio sea un decimal
CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("en-GB");

builder.Services.Configure<ApiBehaviorOptions>(opt =>

{

    opt.SuppressModelStateInvalidFilter = true;

});


builder.Services.Configure<FormOptions>(options =>

{

    options.ValueCountLimit = 2147483647;

});
builder.Services.AddCors(p => p.AddPolicy("AllowAll", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddControllers(options =>

    {

        var jsonInputFormatter = options.InputFormatters.OfType<SystemTextJsonInputFormatter>().First();

        jsonInputFormatter.SupportedMediaTypes.Add("multipart/form-data");

    })
    .AddXmlDataContractSerializerFormatters()
    .AddXmlSerializerFormatters();


// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

// configure DI for application services

//al comentar esta linea si que compila ⬇
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ProductoService>();
builder.Services.AddScoped<ContactoService>();
builder.Services.AddScoped<PedidoService>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//base de datos
//en el archivo appsettings.json, si se eliminan las ultimas 2 lineas de la url (el connection string) y se cambia la url a localhost funciona para probar
//estas son las 2 lineas tal cual se tienen que pegar si se despliega online (creo que era para el somee.com)
/*,
  "ConnectionStrings": {
    "BaseDeDatos": "workstation id=benidormfitnessdb.mssql.somee.com;packet size=4096;user id=Blas1909_SQLLogin_1;pwd=y3o21xqtj9;data source=benidormfitnessdb.mssql.somee.com;persist security info=False;initial catalog=benidormfitnessdb" 
  }*/
//si se descomenta esta linea funciona, comentando las siguientes 2 lineas de codigo
 builder.Services.AddSqlite<BaseDeDatos>("Data Source=tiendadb.db");
//final apartado base de datos
//cambiar la linea de arriba por 
// builder.Services.AddDbContext<BaseDeDatos>(options =>
//         options.UseSqlServer(builder.Configuration.GetConnectionString("BaseDeDatos")));





var app = builder.Build();



//crear la base de datos
app.CreateDbIfNotExists();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}
    app.UseSwagger();
    app.UseSwaggerUI();

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});
//cors
app.UseCors("AllowAll");

app.UseMiddleware<JwtMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

//intento fallido
// public class Startup
// {
//     public void ConfigureServices(IServiceCollection services)
//         => services.AddDbContext<BaseDeDatos>();
// }
