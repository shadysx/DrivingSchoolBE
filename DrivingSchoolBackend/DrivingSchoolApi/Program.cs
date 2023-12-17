var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder =>
        {
            builder.AllowAnyOrigin() // This allows requests from any origin
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Context>();

// builder.WebHost.ConfigureKestrel(serverOptions =>
// {
//     serverOptions.ListenLocalhost(5001, listenOptions =>
//     {
//         listenOptions.UseHttps(); // Enable HTTPS
//     });
// });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Configure CORS to allow any origin



// To open outside localhost, be carefull for security
// builder.WebHost.UseUrls("http://0.0.0.0:5143");

app.UseCors("AllowAnyOrigin"); // Use the CORS policy

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
