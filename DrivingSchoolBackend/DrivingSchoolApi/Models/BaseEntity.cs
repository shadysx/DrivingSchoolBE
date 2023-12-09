using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrivingSchoolApi.Models
{
    public abstract class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id {get; set;}
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    }
}