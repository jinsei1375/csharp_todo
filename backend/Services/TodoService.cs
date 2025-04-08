using backend.Mappers;
using backend.Models.DTOs;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class TodoService
    {
        private readonly ITodoRepository _todoRepository;
        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }
        public async Task<IEnumerable<TodoDTO>> GetTodosAsync()
        {
            var todos = await _todoRepository.GetAllAsync();
            return TodoMapper.ToDTOList(todos);
        }

        public async Task<TodoDTO?> GetTodoByIdAsync(int id)
        {
            var todo = await _todoRepository.GetByIdAsync(id);
            return todo != null ? TodoMapper.ToDTO(todo) : null;
        }

        public async Task<TodoDTO> AddTodoAsync(TodoDTO todoDto)
        {
            var todo = new TodoEntity
            {
                Title = todoDto.Title,
                IsCompleted = todoDto.IsCompleted,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var addedTodo = await _todoRepository.AddAsync(todo);
            return TodoMapper.ToDTO(addedTodo);
        }

        public async Task<TodoDTO?> UpdateTodoAsync(int id, TodoDTO todoDto)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(id);
            if (existingTodo == null)
            {
                return null;
            }

            existingTodo.Title = todoDto.Title;
            existingTodo.IsCompleted = todoDto.IsCompleted;
            existingTodo.UpdatedAt = DateTime.UtcNow;

            var updatedTodo = await _todoRepository.UpdateAsync(existingTodo);
            if (updatedTodo == null)
            {
                return null;
            }
            return TodoMapper.ToDTO(updatedTodo);
        }

        public async Task<bool> DeleteTodoAsync(int id)
        {
            return await _todoRepository.DeleteAsync(id);
        }

        public async Task<List<TodoDTO>> UpdateTodoOrderAsync(List<TodoDTO> todos)
        {
            var todoEntities = TodoMapper.ToEntityList(todos);
            var updatedTodos = await _todoRepository.UpdateOrderAsync(todoEntities);
            return TodoMapper.ToDTOList(updatedTodos);
        }
    }
}