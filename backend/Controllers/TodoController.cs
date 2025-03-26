using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
      private readonly IApplicationDbContext _context;

      public TodoController(IApplicationDbContext context)
      {
        _context = context;
      }

      [HttpGet]
      public IActionResult GetTodos()
      {
        return Ok(_context.Todos.ToList());
      }

      [HttpPost]
      public IActionResult AddTodo([FromBody] Todo todo)
      {
        _context.Todos.Add(todo);
        _context.SaveChanges();
        return Ok(todo);
      }

      [HttpPut("{id}")]
      public IActionResult UpdateTodo(int id, [FromBody] Todo todo)
      {
        var existingTodo = _context.Todos.Find(id);
        if (existingTodo == null)
        {
          return NotFound();
        }
        existingTodo.Title = todo.Title;
        existingTodo.IsCompleted = todo.IsCompleted;
        _context.SaveChanges();
        return Ok(existingTodo);
      }

    }
}