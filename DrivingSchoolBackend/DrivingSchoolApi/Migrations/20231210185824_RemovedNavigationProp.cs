using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrivingSchoolApi.Migrations
{
    /// <inheritdoc />
    public partial class RemovedNavigationProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId",
                table: "QuizzSummaryElement");

            migrationBuilder.AlterColumn<int>(
                name: "QuizzSummaryId",
                table: "QuizzSummaryElement",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "QuizzSummaryId1",
                table: "QuizzSummaryElement",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_QuizzSummaryElement_QuizzSummaryId1",
                table: "QuizzSummaryElement",
                column: "QuizzSummaryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId",
                table: "QuizzSummaryElement",
                column: "QuizzSummaryId",
                principalTable: "QuizSummaries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId1",
                table: "QuizzSummaryElement",
                column: "QuizzSummaryId1",
                principalTable: "QuizSummaries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId",
                table: "QuizzSummaryElement");

            migrationBuilder.DropForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId1",
                table: "QuizzSummaryElement");

            migrationBuilder.DropIndex(
                name: "IX_QuizzSummaryElement_QuizzSummaryId1",
                table: "QuizzSummaryElement");

            migrationBuilder.DropColumn(
                name: "QuizzSummaryId1",
                table: "QuizzSummaryElement");

            migrationBuilder.AlterColumn<int>(
                name: "QuizzSummaryId",
                table: "QuizzSummaryElement",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuizzSummaryElement_QuizSummaries_QuizzSummaryId",
                table: "QuizzSummaryElement",
                column: "QuizzSummaryId",
                principalTable: "QuizSummaries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
