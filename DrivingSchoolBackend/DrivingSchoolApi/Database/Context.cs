using DrivingSchoolApi.Models;
using Microsoft.EntityFrameworkCore;

public class Context : DbContext
{
    public Context() { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(@"Server=localhost;Database=DrivingSchool;Port=5432;User Id=DriverSchoolUser;Password=toor");
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
        modelBuilder.Entity<QuizzSummaryElement>()
            .HasOne(q => q.Question)
            .WithMany() // No need to specify the collection property since it's not in Question
            .HasForeignKey(q => q.QuestionId);
        
        // Many to Many UserQuestion
        // modelBuilder.Entity<UserQuestion>()
        //     .HasKey(uq => new { uq.UserId, uq.QuestionId });
        //
        // modelBuilder.Entity<UserQuestion>()
        //     .HasOne<User>(uq => uq.User)
        //     .WithMany(u => u.UserQuestions)
        //     .HasForeignKey(uq => uq.UserId);
        //
        // modelBuilder.Entity<UserQuestion>()
        //     .HasOne<Question>(uq => uq.Question)
        //     .WithMany() // No navigation property in Question
        //     .HasForeignKey(uq => uq.QuestionId);
    }
}