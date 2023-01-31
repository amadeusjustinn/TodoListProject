using System.ComponentModel.DataAnnotations;

namespace TodoAPI.Models
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = "Default title";
        public string Description { get; set; } = "Default description";

        [Required]
        public bool Completed { get; set; }
    }
}
