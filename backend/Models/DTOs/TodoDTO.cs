namespace backend.Models.DTOs
{
    public class TodoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int Order { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}