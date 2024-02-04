using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DrivingSchoolApi.Models;

namespace DrivingSchoolApi.Models
{
    public class User: BaseEntity
	{
		public required string Email {get; set;}
        public required string UserName {get; set;}
        public List<Question> SavedQuestions { get; set; }
        public List<QuizzSummary> QuizSummaries {get; set;}
    }
}