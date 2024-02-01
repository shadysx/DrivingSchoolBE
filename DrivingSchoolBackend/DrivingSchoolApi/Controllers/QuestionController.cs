using DrivingSchoolApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolApi.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : ControllerBase
{
    private readonly Context _dbContext;

    public QuestionController(Context context)
    {
        _dbContext = context; 
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> List()
    {
        var questions = await _dbContext.Questions.ToListAsync();
        return Ok(questions);
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create(Question model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _dbContext.Questions?.Add(model);
        await _dbContext.SaveChangesAsync();
        
        return Ok(model);
    }

    [HttpPost("BatchCreate")]
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

    [HttpPut("Update")]
    public async Task<IActionResult> Update(Question updatedModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var existingQuestion = await _dbContext.Questions.FindAsync(updatedModel.Id);

        if (existingQuestion == null)
        {
            return NotFound(); // Assuming you want to return a 404 if the resource is not found
        }

        // Update properties of existingQuestion with values from updatedModel
        existingQuestion.Title = updatedModel.Title;
        existingQuestion.Text = updatedModel.Text;
        // ... update other properties as needed

        // Mark the entity as modified
        _dbContext.Entry(existingQuestion).State = EntityState.Modified;

        await _dbContext.SaveChangesAsync();

        return Ok(existingQuestion);
    }

    [HttpPut("BatchUpdate")]
public async Task<IActionResult> UpdateBatch(List<Question> updatedModels)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    foreach (var updatedModel in updatedModels)
    {
        var existingQuestion = await _dbContext.Questions.FindAsync(updatedModel.Id);

        if (existingQuestion == null)
        {
            return NotFound(); // Assuming you want to return a 404 if any resource is not found
        }

        // Update properties of existingQuestion with values from updatedModel
        existingQuestion.Title = updatedModel.Title;
        existingQuestion.Text = updatedModel.Text;
        // ... update other properties as needed

        // Mark the entity as modified
        _dbContext.Entry(existingQuestion).State = EntityState.Modified;
    }

    await _dbContext.SaveChangesAsync();

    // Return the updated list of questions if needed
    return Ok(updatedModels);
}

}
