using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data 
{

  public interface IApplicationDbContext
    {
        DbSet<Todo> Todos { get; set; }
        int SaveChanges();
    }
  public class ApplicationDbContext : DbContext, IApplicationDbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public ApplicationDbContext(){}

    public DbSet<Todo> Todos { get; set; }
  }
}