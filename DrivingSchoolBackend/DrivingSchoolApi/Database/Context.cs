using DrivingSchoolApi.Models;
using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
    public Context() { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Server=localhost;Database=DrivingSchool;Port=5432;User Id=DrivingSchoolUser;Password=toor");
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<QuizzSummary> QuizSummaries { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure one-to-many relationship
        modelBuilder.Entity<QuizzSummary>()
            .HasMany(q => q.QuizzSummaryElements)
            .WithOne()
            .HasForeignKey(e => e.QuizzSummaryId); // Foreign key
    }
}