using Microsoft.AspNetCore.Mvc;
using backend.Repositories;
using backend.Models.DTOs;
using backend.Models.Entities;
using backend.Mappers;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        // コンストラクタでリポジトリを注入
        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        // 全てのTodoを取得
        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _todoRepository.GetAllAsync();
            return Ok(TodoMapper.ToDTOList(todos));
        }

        // Todoを追加
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] TodoDTO todoDto)
        {
            var todo = new TodoEntity
            {
                Title = todoDto.Title,
                IsCompleted = todoDto.IsCompleted,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var addedTodo = await _todoRepository.AddAsync(todo);
            return CreatedAtAction(nameof(GetTodoById), new { id = addedTodo.Id }, addedTodo); // 新規追加したTodoを返す
        }

        // Todoを更新
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoDTO todoDto)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            existingTodo.Title = todoDto.Title;
            existingTodo.IsCompleted = todoDto.IsCompleted;
            existingTodo.UpdatedAt = DateTime.UtcNow;

            var updatedTodo = await _todoRepository.UpdateAsync(existingTodo);
            return Ok(updatedTodo);
        }

        // Todoを削除
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoById(int id)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            await _todoRepository.DeleteAsync(id);
            return NoContent();  // 削除した場合は 204 NoContent を返す
        }

        // 個別のTodoを取得（詳細表示）
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }
    }
}
