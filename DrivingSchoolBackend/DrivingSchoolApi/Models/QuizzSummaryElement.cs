using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DrivingSchoolApi.Models;

namespace DrivingSchoolApi.Models
{
    public class QuizzSummaryElement: BaseEntity 
	{
		public required string QuestionText {get; set;}
		public required int CorrectAnswerIndex {get; set;}
		public required int UserAnswerIndex {get; set;}
        public required bool IsAnswerCorrect {get; set;}

        // Foreign key and navigation property back to QuizzSummary
        public int? QuizzSummaryId { get; set; }
        public QuizzSummary? QuizzSummary { get; set; }
    }
}