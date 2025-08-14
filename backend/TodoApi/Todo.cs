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

        /// <summary>
        /// Optional deadline for the todo item. If null, no deadline is set.
        /// </summary>
        public DateTime? Deadline { get; set; }

        /// <summary>
        /// Computed property to check if the todo is overdue
        /// </summary>
        public bool IsOverdue => Deadline.HasValue && !Completed && DateTime.UtcNow > Deadline.Value;

        /// <summary>
        /// Computed property to get time remaining until deadline
        /// </summary>
        public TimeSpan? TimeRemaining => Deadline.HasValue && !Completed ? Deadline.Value - DateTime.UtcNow : null;

        /// <summary>
        /// Priority level based on deadline urgency (1 = most urgent, 5 = least urgent)
        /// </summary>
        public int Priority
        {
            get
            {
                if (!Deadline.HasValue) return 5; // No deadline = lowest priority
                if (Completed) return 5; // Completed items = lowest priority

                var timeRemaining = Deadline.Value - DateTime.UtcNow;

                if (timeRemaining.TotalHours < 0) return 1; // Overdue = highest priority
                if (timeRemaining.TotalHours < 24) return 2; // Less than 1 day = high priority
                if (timeRemaining.TotalDays < 7) return 3; // Less than 1 week = medium priority
                if (timeRemaining.TotalDays < 30) return 4; // Less than 1 month = low priority

                return 5; // More than 1 month = lowest priority
            }
        }
    }
}