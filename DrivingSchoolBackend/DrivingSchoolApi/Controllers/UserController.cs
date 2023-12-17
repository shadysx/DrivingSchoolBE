using DrivingSchoolApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolApi.Controllers;

public class UserController: ControllerBase
{
    private readonly Context _dbContext;

    public UserController(Context context)
    {
        _dbContext = context; 
    }
    
    [HttpGet("GetAll")]
    public async Task<IActionResult> List()
    {
        var users = await _dbContext.Users
            .Include(u => u.SavedQuestions)
            .ToListAsync();

        return Ok(users);
    }
    
    [HttpPut("Update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] User updatedUser)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (id != updatedUser.Id)
        {
            return BadRequest("ID mismatch");
        }

        var existingUser = await _dbContext.Users
            .Include(u => u.SavedQuestions)
            .FirstOrDefaultAsync(u => u.Id == id);
        if (existingUser == null)
        {
            return NotFound();
        }

        // Remove existing associations
        existingUser.SavedQuestions.Clear();

        // Add new associations
        foreach (var question in updatedUser.SavedQuestions)
        {
            var existingQuestion = await _dbContext.Questions.FindAsync(question.Id);
            if (existingQuestion != null)
            {
                existingUser.SavedQuestions.Add(existingQuestion);
            }
        }

        // Update the scalar properties of the existing user
        _dbContext.Entry(existingUser).CurrentValues.SetValues(updatedUser);

        try
        {
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            // Handle the exception
        }

        return Ok(existingUser);
    }


    private bool UserExists(int id)
    {
        return _dbContext.Users.Any(e => e.Id == id);
    }
}
    