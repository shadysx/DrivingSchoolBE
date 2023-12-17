using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DrivingSchoolApi.Models
{
    public class Question: BaseEntity
	{
		public required string Title {get; set;}
        public required string Text {get; set;}
        // Todo add theme object?
        public required string[] Answers {get; set;}
        public required int AnswerIndex {get; set;}
        public string[]? Themes {get; set;}
        public required string ImageUri {get; set;}
        public string? Explanation {get; set;}
        [JsonIgnore]
        public List<User>? Users { get; set; } 
    }
}