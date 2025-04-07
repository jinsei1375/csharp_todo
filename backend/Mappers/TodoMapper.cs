using backend.Models.Entities;
using backend.Models.DTOs;

namespace backend.Mappers
{
    public static class TodoMapper
    {
        public static TodoDTO ToDTO(this TodoEntity entity)
        {
            return new TodoDTO
            {
                Id = entity.Id,
                Title = entity.Title,
                IsCompleted = entity.IsCompleted,
                Order = entity.Order,
                CreatedAt = entity.CreatedAt,
            };
        }

        public static List<TodoDTO> ToDTOList(this List<TodoEntity> entities)
        {
            return entities.Select(e => e.ToDTO()).ToList();
        }
    }
}
