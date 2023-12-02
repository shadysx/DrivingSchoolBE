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
