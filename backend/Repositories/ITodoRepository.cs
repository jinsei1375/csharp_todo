using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models.Entities;

namespace backend.Repositories
{
  public interface ITodoRepository
  {
    Task<List<TodoEntity>> GetAllAsync();
    Task<TodoEntity?> GetByIdAsync(int id);
    Task<TodoEntity> AddAsync(TodoEntity todo);
    Task<TodoEntity?> UpdateAsync(TodoEntity todo);
    Task<bool> DeleteAsync(int id);
    Task<List<TodoEntity>> UpdateOrderAsync(List<TodoEntity> todos);
  }
}
