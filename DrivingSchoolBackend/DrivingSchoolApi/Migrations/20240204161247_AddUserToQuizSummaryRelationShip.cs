using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrivingSchoolApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUserToQuizSummaryRelationShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "QuizSummaries",
                type: "integer",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.CreateIndex(
                name: "IX_QuizSummaries_UserId",
                table: "QuizSummaries",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizSummaries_Users_UserId",
                table: "QuizSummaries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizSummaries_Users_UserId",
                table: "QuizSummaries");

            migrationBuilder.DropIndex(
                name: "IX_QuizSummaries_UserId",
                table: "QuizSummaries");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "QuizSummaries");
        }
    }
}
