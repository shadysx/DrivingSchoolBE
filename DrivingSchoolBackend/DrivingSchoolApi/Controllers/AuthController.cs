using DrivingSchoolApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolApi.Controllers;
using Google.Apis.Auth;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly Context _dbContext;

    public AuthController(Context context)
    {
        _dbContext = context; 
    }



[HttpPost("VerifyGoogleToken")]
public async Task<IActionResult> VerifyGoogleToken([FromBody] string idToken)
{
    try
    {
        var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);

        if(user == null) {
            var newUser = new User {
                Email = payload.Email,
                UserName = payload.GivenName
                // Add other properties as needed
            };

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();

            // Assuming you have a way to retrieve the user again after saving (like with an ID)
            user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == newUser.Email);
        }

        return Ok(user);
    }
    catch (Exception ex)
    {
        // Consider logging the exception for debugging
        return BadRequest(ex.Message); // You can return the exception message or a custom error message
    }
}



    [HttpPost("Create")]
    public async Task<IActionResult> Create(User model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _dbContext.Users?.Add(model);
        await _dbContext.SaveChangesAsync();
        
        return Ok(model);
    }
}
