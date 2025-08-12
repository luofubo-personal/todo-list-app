using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using TodoApi;
using TodoApi.Controllers;
using TodoApi.Models;
using Xunit;

namespace TodoApi.Tests.Tests
{
    public class TodosControllerTests
    {
        [Fact]
        public async Task GetTodoItems_ReturnsAllItems()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var mockSet = new Mock<DbSet<TodoItem>>();
            
            var data = new List<TodoItem>
            {
                new TodoItem { Id = 1, Name = "Task 1", IsComplete = false },
                new TodoItem { Id = 2, Name = "Task 2", IsComplete = true }
            }.AsQueryable();
            
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
            
            mockContext.Setup(c => c.TodoItems).Returns(mockSet.Object);
            
            var controller = new TodosController(mockContext.Object);
            
            // Act
            var result = await controller.GetTodoItems();
            
            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<TodoItem>>>(result);
            var returnValue = Assert.IsType<List<TodoItem>>(actionResult.Value);
            Assert.Equal(2, returnValue.Count);
        }
        
        [Fact]
        public async Task GetTodoItem_ReturnsItem_WhenItemExists()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var mockSet = new Mock<DbSet<TodoItem>>();
            
            var data = new List<TodoItem>
            {
                new TodoItem { Id = 1, Name = "Task 1", IsComplete = false },
                new TodoItem { Id = 2, Name = "Task 2", IsComplete = true }
            }.AsQueryable();
            
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
            
            mockContext.Setup(c => c.TodoItems).Returns(mockSet.Object);
            mockContext.Setup(c => c.TodoItems.FindAsync(1)).Returns(new ValueTask<TodoItem>(data.First()));
            
            var controller = new TodosController(mockContext.Object);
            
            // Act
            var result = await controller.GetTodoItem(1);
            
            // Assert
            var actionResult = Assert.IsType<ActionResult<TodoItem>>(result);
            var returnValue = Assert.IsType<TodoItem>(actionResult.Value);
            Assert.Equal(1, returnValue.Id);
        }
        
        [Fact]
        public async Task GetTodoItem_ReturnsNotFound_WhenItemDoesNotExist()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var mockSet = new Mock<DbSet<TodoItem>>();
            
            var data = new List<TodoItem>().AsQueryable();
            
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<TodoItem>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());
            
            mockContext.Setup(c => c.TodoItems).Returns(mockSet.Object);
            mockContext.Setup(c => c.TodoItems.FindAsync(1)).Returns(new ValueTask<TodoItem>((TodoItem)null));
            
            var controller = new TodosController(mockContext.Object);
            
            // Act
            var result = await controller.GetTodoItem(1);
            
            // Assert
            var actionResult = Assert.IsType<ActionResult<TodoItem>>(result);
            Assert.IsType<NotFoundResult>(actionResult.Result);
        }
        
        [Fact]
        public async Task PostTodoItem_ReturnsCreatedAtAction()
        {
            // Arrange
            var mockContext = new Mock<TodoContext>(new DbContextOptionsBuilder<TodoContext>().Options);
            var mockSet = new Mock<DbSet<TodoItem>>();
            
            mockContext.Setup(c => c.TodoItems).Returns(mockSet.Object);
            
            var controller = new TodosController(mockContext.Object);
            var newItem = new TodoItem { Name = "New Task" };
            
            // Act
            var result = await controller.PostTodoItem(newItem);
            
            // Assert
            var actionResult = Assert.IsType<ActionResult<TodoItem>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<TodoItem>(createdAtActionResult.Value);
            Assert.Equal(newItem.Name, returnValue.Name);
        }
    }
}