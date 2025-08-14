
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Controllers;
using TodoApi.Models;
using Xunit;

namespace TodoApi.Tests.Tests
{
    public class TodosControllerTests
    {
        [Fact]
        public async Task GetTodos_ReturnsAllItems()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);

            var data = new List<Todo>
            {
                new Todo { Id = 1, Text = "Task 1", Completed = false },
                new Todo { Id = 2, Text = "Task 2", Completed = true }
            };

            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);

            var controller = new TodosController(mockContext.Object);

            // Act
            var result = await controller.GetTodos();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Todo>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<Todo>>(okResult.Value);
            Assert.Equal(2, returnValue.Count);
        }

        [Fact]
        public async Task GetTodos_ReturnsSortedByPriority()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);

            var now = DateTime.UtcNow;
            var data = new List<Todo>
            {
                new Todo { Id = 1, Text = "No deadline", Completed = false, Timestamp = now },
                new Todo { Id = 2, Text = "Overdue", Completed = false, Timestamp = now, Deadline = now.AddHours(-1) },
                new Todo { Id = 3, Text = "Urgent", Completed = false, Timestamp = now, Deadline = now.AddHours(12) },
                new Todo { Id = 4, Text = "Completed", Completed = true, Timestamp = now, Deadline = now.AddHours(1) }
            };

            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);

            var controller = new TodosController(mockContext.Object);

            // Act
            var result = await controller.GetTodos();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Todo>>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<List<Todo>>(okResult.Value);

            // Should be sorted: incomplete items first (by priority), then completed items
            Assert.Equal(4, returnValue.Count);
            Assert.Equal("Overdue", returnValue[0].Text); // Priority 1 (overdue)
            Assert.Equal("Urgent", returnValue[1].Text);  // Priority 2 (< 24h)
            Assert.Equal("No deadline", returnValue[2].Text); // Priority 5 (no deadline)
            Assert.Equal("Completed", returnValue[3].Text); // Completed items last
        }
        
        [Fact]
        public async Task GetTodo_ReturnsItem_WhenItemExists()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);

            var data = new List<Todo>
            {
                new Todo { Id = 1, Text = "Task 1", Completed = false },
                new Todo { Id = 2, Text = "Task 2", Completed = true }
            };

            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);
            mockContext.Setup(c => c.Todos.FindAsync(1)).ReturnsAsync(data.First());

            var controller = new TodosController(mockContext.Object);

            // Act
            var result = await controller.GetTodo(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnValue = Assert.IsType<Todo>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
        }
        
        [Fact]
        public async Task GetTodo_ReturnsNotFound_WhenItemDoesNotExist()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);

            var data = new List<Todo>();

            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);
            mockContext.Setup(c => c.Todos.FindAsync(1)).ReturnsAsync((Todo?)null);

            var controller = new TodosController(mockContext.Object);

            // Act
            var result = await controller.GetTodo(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        }
        
        [Fact]
        public async Task PostTodo_ReturnsCreatedAtAction()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);

            var data = new List<Todo>();
            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);

            var controller = new TodosController(mockContext.Object);
            var newItem = new Todo { Text = "New Task" };

            // Act
            var result = await controller.PostTodo(newItem);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<Todo>(createdAtActionResult.Value);
            Assert.Equal(newItem.Text, returnValue.Text);
        }

        [Fact]
        public async Task PostTodo_ReturnsBadRequest_WhenTextIsEmpty()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var controller = new TodosController(mockContext.Object);
            var newItem = new Todo { Text = "" };

            // Act
            var result = await controller.PostTodo(newItem);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task PostTodo_ReturnsBadRequest_WhenTextIsTooLong()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var controller = new TodosController(mockContext.Object);
            var newItem = new Todo { Text = new string('a', 501) }; // 501 characters

            // Act
            var result = await controller.PostTodo(newItem);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        }

        [Fact]
        public async Task PutTodo_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var controller = new TodosController(mockContext.Object);
            var todo = new Todo { Id = 1, Text = "Test" };

            // Act
            var result = await controller.PutTodo(2, todo); // Different IDs

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteTodo_ReturnsBadRequest_WhenIdIsInvalid()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var controller = new TodosController(mockContext.Object);

            // Act
            var result = await controller.DeleteTodo(0); // Invalid ID

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
