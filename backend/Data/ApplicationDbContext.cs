using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data 
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public ApplicationDbContext(){}

    public DbSet<Todo> Todos { get; set; }
  }
}