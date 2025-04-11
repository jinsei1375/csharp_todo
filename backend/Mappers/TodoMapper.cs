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
                IsDeleted = entity.IsDeleted,
                CreatedAt = entity.CreatedAt,
            };
        }

        public static List<TodoDTO> ToDTOList(this List<TodoEntity> entities)
        {
            return entities.Select(e => e.ToDTO()).ToList();
        }

        public static List<TodoEntity> ToEntityList(this List<TodoDTO> dtos)
        {
            return dtos.Select(d => new TodoEntity
            {
                Id = d.Id,
                Title = d.Title,
                IsCompleted = d.IsCompleted,
                Order = d.Order,
                IsDeleted = d.IsDeleted,
                CreatedAt = d.CreatedAt,
            }).ToList();
        }
    }
}
