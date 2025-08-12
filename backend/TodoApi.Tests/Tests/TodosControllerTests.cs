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
            var returnValue = Assert.IsType<List<Todo>>(actionResult.Value);
            Assert.Equal(2, returnValue.Count);
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
            var returnValue = Assert.IsType<Todo>(actionResult.Value);
            Assert.Equal(1, returnValue.Id);
        }
        
        [Fact]
        public async Task GetTodo_ReturnsNotFound_WhenItemDoesNotExist()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            
            var data = new List<Todo>();
            
            mockContext.Setup(c => c.Todos).ReturnsDbSet(data);
            mockContext.Setup(c => c.Todos.FindAsync(1)).ReturnsAsync((Todo)null);
            
            var controller = new TodosController(mockContext.Object);
            
            // Act
            var result = await controller.GetTodo(1);
            
            // Assert
            var actionResult = Assert.IsType<ActionResult<Todo>>(result);
            Assert.IsType<NotFoundResult>(actionResult.Result);
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
    }
}