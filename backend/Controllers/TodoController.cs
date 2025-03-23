using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
      private readonly ApplicationDbContext _context;

      public TodoController(ApplicationDbContext context)
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

    }
}