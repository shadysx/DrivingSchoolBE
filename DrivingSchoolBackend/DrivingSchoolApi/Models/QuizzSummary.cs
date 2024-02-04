using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using DrivingSchoolApi.Models;

namespace DrivingSchoolApi.Models
{
    public class QuizzSummary: BaseEntity 
	{
		public required int Score {get; set;}
        // Navigation property for one-to-many relationship
        public required bool isSuccess {get; set;}
        public required List<QuizzSummaryElement> QuizzSummaryElements { get; set; }
        public int UserId {get; set;}
        [JsonIgnore]
        public User? User {get; set;}
    }
}