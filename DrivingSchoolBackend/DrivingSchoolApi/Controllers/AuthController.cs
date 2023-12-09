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
            // Check if the user exists in the database
            // If not, create a new user record
            // Return a response, e.g., user data or a success message
        }
        catch (Exception ex)
        {
            // Handle the exception (token validation failed)
            return BadRequest();
        }
        return Ok(idToken);
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> List()
    {
        var users = await _dbContext.Users.ToListAsync();
        return Ok(users);
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

    [HttpPost("BulkCreate")]
    public async Task<IActionResult> BulkCreate(Question[] models)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        foreach(Question model in models){
            _dbContext.Questions?.Add(model);
            await _dbContext.SaveChangesAsync();
        }

        
        return Ok(models);
    }
}
