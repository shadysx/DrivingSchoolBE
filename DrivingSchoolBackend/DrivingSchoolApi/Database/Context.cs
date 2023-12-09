using DrivingSchoolApi.Models;
using Microsoft.EntityFrameworkCore;

public class Context: DbContext
{
    public Context(){}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Server=localhost;Database=DrivingSchool;Port=5432;User Id=DrivingSchoolUser;Password=toor");
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<User> Users { get; set; }
}