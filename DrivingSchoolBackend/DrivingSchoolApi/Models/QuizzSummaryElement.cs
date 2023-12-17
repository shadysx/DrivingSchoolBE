using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DrivingSchoolApi.Models;

namespace DrivingSchoolApi.Models
{
    public class QuizzSummaryElement: BaseEntity 
	{
		public required int UserAnswerIndex {get; set;}

        public int? QuizzSummaryId { get; set; }

        public required bool IsAnswerCorrect {get; set;}

        // Foreign key for Question
        public int QuestionId { get; set; }
        // Navigation property for the one-to-one relationship
        [ForeignKey("QuestionId")]
        public Question? Question { get; set; }
    }
}