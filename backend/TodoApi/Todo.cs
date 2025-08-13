using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class Todo
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Todo text is required.")]
        [StringLength(500, MinimumLength = 1, ErrorMessage = "Todo text must be between 1 and 500 characters.")]
        public string Text { get; set; } = string.Empty;

        public bool Completed { get; set; } = false;

        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}