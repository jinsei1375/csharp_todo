using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models.Entities;
using backend.Data;

namespace backend.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoEntity>> GetAllAsync()
        {
            return await _context.Todos
            .OrderByDescending(todo => !todo.IsCompleted)
            .ThenByDescending(todo => todo.CreatedAt)
            .ToListAsync();
        }

        public async Task<TodoEntity?> GetByIdAsync(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<TodoEntity> AddAsync(TodoEntity todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<TodoEntity?> UpdateAsync(TodoEntity todo)
        {
            var existingTodo = await _context.Todos.FindAsync(todo.Id);
            if (existingTodo == null) return null;

            existingTodo.Title = todo.Title;
            existingTodo.IsCompleted = todo.IsCompleted;

            await _context.SaveChangesAsync();
            return existingTodo;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return false;

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
