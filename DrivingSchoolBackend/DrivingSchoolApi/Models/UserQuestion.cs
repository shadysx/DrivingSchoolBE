namespace DrivingSchoolApi.Models;

public class UserQuestion
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int QuestionId { get; set; }
    public Question Question { get; set; }
}