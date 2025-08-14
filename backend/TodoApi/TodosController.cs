using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _context;
        
        public TodosController(TodoContext context)
        {
            _context = context;
        }
        
        // GET: api/todos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            try
            {
                var todos = await _context.Todos.ToListAsync();

                // Sort by priority (deadline-based), then by timestamp for items with same priority
                var sortedTodos = todos
                    .OrderBy(t => t.Completed) // Incomplete items first
                    .ThenBy(t => t.Priority)   // Then by priority (1 = most urgent)
                    .ThenBy(t => t.Deadline ?? DateTime.MaxValue) // Then by deadline (nulls last)
                    .ThenByDescending(t => t.Timestamp) // Finally by creation time
                    .ToList();

                return Ok(sortedTodos);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving todos: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving todo items.");
            }
        }

        // GET: api/todos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid todo ID.");
            }

            try
            {
                var todo = await _context.Todos.FindAsync(id);

                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found.");
                }

                return Ok(todo);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving todo {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the todo item.");
            }
        }
        
        // POST: api/todos
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            // Validate model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate required fields
            if (string.IsNullOrWhiteSpace(todo.Text))
            {
                return BadRequest("Todo text cannot be empty or whitespace.");
            }

            if (todo.Text.Length > 500)
            {
                return BadRequest("Todo text cannot exceed 500 characters.");
            }

            try
            {
                // Set server-side values
                todo.Id = 0; // Let database generate ID
                todo.Timestamp = DateTime.UtcNow; // Use UTC for consistency

                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
            }
            catch (Exception ex)
            {
                // Log the exception (in a real app, use proper logging)
                Console.WriteLine($"Error creating todo: {ex.Message}");
                return StatusCode(500, "An error occurred while creating the todo item.");
            }
        }
        
        // PUT: api/todos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, Todo todo)
        {
            // Validate model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todo.Id)
            {
                return BadRequest("ID in URL does not match ID in request body.");
            }

            // Validate required fields
            if (string.IsNullOrWhiteSpace(todo.Text))
            {
                return BadRequest("Todo text cannot be empty or whitespace.");
            }

            if (todo.Text.Length > 500)
            {
                return BadRequest("Todo text cannot exceed 500 characters.");
            }

            // Check if todo exists
            var existingTodo = await _context.Todos.FindAsync(id);
            if (existingTodo == null)
            {
                return NotFound($"Todo with ID {id} not found.");
            }

            try
            {
                // Update only allowed fields, preserve timestamp
                existingTodo.Text = todo.Text;
                existingTodo.Completed = todo.Completed;
                // Keep original timestamp, don't update it

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!TodoExists(id))
                {
                    return NotFound($"Todo with ID {id} was deleted by another process.");
                }
                else
                {
                    Console.WriteLine($"Concurrency error updating todo {id}: {ex.Message}");
                    return Conflict("The todo was modified by another process. Please refresh and try again.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating todo {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while updating the todo item.");
            }

            return NoContent();
        }
        
        // DELETE: api/todos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid todo ID.");
            }

            try
            {
                var todo = await _context.Todos.FindAsync(id);
                if (todo == null)
                {
                    return NotFound($"Todo with ID {id} not found.");
                }

                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting todo {id}: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the todo item.");
            }
        }
        
        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}