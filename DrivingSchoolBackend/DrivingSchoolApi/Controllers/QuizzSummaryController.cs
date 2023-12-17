using DrivingSchoolApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolApi.Controllers;

[ApiController]
[Route("[controller]")]
public class QuizSummaryController : ControllerBase
{
    private readonly Context _dbContext;

    public QuizSummaryController(Context context)
    {
        _dbContext = context; 
    }

    [HttpGet("GetAll")]
    public async Task<IActionResult> List()
    {
        var quizzSummaries = await _dbContext.QuizSummaries
            .Include(q => q.QuizzSummaryElements)
            .ThenInclude(q => q.Question)
            .ToListAsync();
        return Ok(quizzSummaries);
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] QuizzSummary model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        foreach(QuizzSummaryElement quizzSummaryElement in model.QuizzSummaryElements)
        {
            quizzSummaryElement.QuestionId = quizzSummaryElement.Question?.Id ?? 0;
            quizzSummaryElement.Question = null;
        }

        _dbContext.QuizSummaries?.Add(model);
        await _dbContext.SaveChangesAsync();
        
        return Ok(model);
    }
}
