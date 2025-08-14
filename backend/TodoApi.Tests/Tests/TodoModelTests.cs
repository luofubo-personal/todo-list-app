using System;
using TodoApi.Models;
using Xunit;

namespace TodoApi.Tests.Tests
{
    public class TodoModelTests
    {
        [Fact]
        public void IsOverdue_ReturnsFalse_WhenNoDeadline()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = null
            };

            // Act & Assert
            Assert.False(todo.IsOverdue);
        }

        [Fact]
        public void IsOverdue_ReturnsFalse_WhenCompleted()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = true,
                Deadline = DateTime.UtcNow.AddHours(-1) // Past deadline
            };

            // Act & Assert
            Assert.False(todo.IsOverdue);
        }

        [Fact]
        public void IsOverdue_ReturnsFalse_WhenDeadlineInFuture()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = DateTime.UtcNow.AddHours(1) // Future deadline
            };

            // Act & Assert
            Assert.False(todo.IsOverdue);
        }

        [Fact]
        public void IsOverdue_ReturnsTrue_WhenDeadlinePassed()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = DateTime.UtcNow.AddHours(-1) // Past deadline
            };

            // Act & Assert
            Assert.True(todo.IsOverdue);
        }

        [Fact]
        public void TimeRemaining_ReturnsNull_WhenNoDeadline()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = null
            };

            // Act & Assert
            Assert.Null(todo.TimeRemaining);
        }

        [Fact]
        public void TimeRemaining_ReturnsNull_WhenCompleted()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = true,
                Deadline = DateTime.UtcNow.AddHours(1)
            };

            // Act & Assert
            Assert.Null(todo.TimeRemaining);
        }

        [Fact]
        public void TimeRemaining_ReturnsPositiveTimeSpan_WhenDeadlineInFuture()
        {
            // Arrange
            var futureDeadline = DateTime.UtcNow.AddHours(2);
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = futureDeadline
            };

            // Act
            var timeRemaining = todo.TimeRemaining;

            // Assert
            Assert.NotNull(timeRemaining);
            Assert.True(timeRemaining.Value.TotalHours > 1.5);
            Assert.True(timeRemaining.Value.TotalHours < 2.5);
        }

        [Fact]
        public void TimeRemaining_ReturnsNegativeTimeSpan_WhenOverdue()
        {
            // Arrange
            var pastDeadline = DateTime.UtcNow.AddHours(-1);
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = pastDeadline
            };

            // Act
            var timeRemaining = todo.TimeRemaining;

            // Assert
            Assert.NotNull(timeRemaining);
            Assert.True(timeRemaining.Value.TotalHours < 0);
        }

        [Theory]
        [InlineData(null, false, 5)] // No deadline, not completed
        [InlineData(null, true, 5)]  // No deadline, completed
        [InlineData(-2.0, false, 1)]   // Overdue, not completed
        [InlineData(-2.0, true, 5)]    // Overdue, completed
        [InlineData(12.0, false, 2)]   // Less than 24 hours, not completed
        [InlineData(12.0, true, 5)]    // Less than 24 hours, completed
        [InlineData(72.0, false, 3)]   // Less than 1 week, not completed
        [InlineData(72.0, true, 5)]    // Less than 1 week, completed
        [InlineData(360.0, false, 4)]  // Less than 1 month, not completed
        [InlineData(360.0, true, 5)]   // Less than 1 month, completed
        [InlineData(1440.0, false, 5)] // More than 1 month, not completed
        [InlineData(1440.0, true, 5)]  // More than 1 month, completed
        public void Priority_ReturnsCorrectValue(double? deadlineHoursFromNow, bool completed, int expectedPriority)
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = completed,
                Deadline = deadlineHoursFromNow.HasValue ? DateTime.UtcNow.AddHours(deadlineHoursFromNow.Value) : null
            };

            // Act
            var priority = todo.Priority;

            // Assert
            Assert.Equal(expectedPriority, priority);
        }

        [Fact]
        public void Priority_ReturnsHighestForOverdue()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Overdue Todo",
                Completed = false,
                Deadline = DateTime.UtcNow.AddHours(-5) // 5 hours overdue
            };

            // Act & Assert
            Assert.Equal(1, todo.Priority);
        }

        [Fact]
        public void Priority_ReturnsUrgentForNearDeadline()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Urgent Todo",
                Completed = false,
                Deadline = DateTime.UtcNow.AddHours(6) // 6 hours remaining
            };

            // Act & Assert
            Assert.Equal(2, todo.Priority);
        }

        [Fact]
        public void Priority_ReturnsLowestForCompleted()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Completed Todo",
                Completed = true,
                Deadline = DateTime.UtcNow.AddHours(-10) // Even if overdue
            };

            // Act & Assert
            Assert.Equal(5, todo.Priority);
        }

        [Fact]
        public void Priority_ReturnsLowestForNoDeadline()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "No Deadline Todo",
                Completed = false,
                Deadline = null
            };

            // Act & Assert
            Assert.Equal(5, todo.Priority);
        }

        [Fact]
        public void Todo_HandlesNullDeadlineGracefully()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Todo without deadline",
                Completed = false,
                Deadline = null
            };

            // Act & Assert - Should not throw exceptions
            Assert.False(todo.IsOverdue);
            Assert.Null(todo.TimeRemaining);
            Assert.Equal(5, todo.Priority);
        }

        [Fact]
        public void Todo_DefaultValuesAreCorrect()
        {
            // Arrange & Act
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo"
                // Deadline not set (should be null by default)
            };

            // Assert
            Assert.False(todo.Completed); // Default should be false
            Assert.Null(todo.Deadline); // Default should be null
            Assert.False(todo.IsOverdue); // Should be false when no deadline
            Assert.Null(todo.TimeRemaining); // Should be null when no deadline
            Assert.Equal(5, todo.Priority); // Should be lowest priority when no deadline
        }

        [Fact]
        public void Todo_ComputedPropertiesHandleNullDeadlineSafely()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Test Todo",
                Completed = false,
                Deadline = null
            };

            // Act & Assert - Multiple calls should not cause issues
            for (int i = 0; i < 5; i++)
            {
                Assert.False(todo.IsOverdue);
                Assert.Null(todo.TimeRemaining);
                Assert.Equal(5, todo.Priority);
            }
        }

        [Fact]
        public void Todo_CompletedWithNullDeadlineHandledCorrectly()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Text = "Completed Todo",
                Completed = true,
                Deadline = null
            };

            // Act & Assert
            Assert.False(todo.IsOverdue); // Completed todos are never overdue
            Assert.Null(todo.TimeRemaining); // No time remaining when no deadline
            Assert.Equal(5, todo.Priority); // Completed todos have lowest priority
        }
    }
}
