namespace backend.Models.Entities
{
	public class TodoEntity
	{
		public int Id { get; set; }
		public required string Title { get; set; }
		public bool IsCompleted { get; set; }
		public int Order { get; set; }
		public bool IsDeleted { get; set; } = false;
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
		public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	}
}