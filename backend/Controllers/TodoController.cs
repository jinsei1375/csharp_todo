using Microsoft.AspNetCore.Mvc;
using backend.Models.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;
        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        // 全てのTodoを取得
        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _todoService.GetTodosAsync();
            return Ok(todos);
        }

        // Todoを追加
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoDTO todoDto)
        {

            var addedTodo = await _todoService.AddTodoAsync(todoDto);
            return CreatedAtAction(nameof(GetTodoById), new { id = addedTodo.Id }, addedTodo);
        }

        // Todoを更新
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoDTO todoDto)
        {
            var updatedTodo = await _todoService.UpdateTodoAsync(id, todoDto);
            if (updatedTodo == null)
            {
                return NotFound();
            }
            return Ok(updatedTodo);
        }

        // Todoを削除
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoById(int id)
        {
            var deleted = await _todoService.DeleteTodoAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        // 個別のTodoを取得（詳細表示）
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _todoService.GetTodoByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        // Todoの順序を更新
        [HttpPut("reorder")]
        public async Task<IActionResult> UpdateTodoOrder([FromBody] List<TodoDTO> todos)
        {
            var updatedTodos = await _todoService.UpdateTodoOrderAsync(todos);
            return Ok(updatedTodos);
        }
        
    }
}
