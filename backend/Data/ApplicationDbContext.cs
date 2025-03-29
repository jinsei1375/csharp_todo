using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Entities;

namespace backend.Data 
{

  public interface IApplicationDbContext
    {
        DbSet<TodoEntity> Todos { get; set; }
        int SaveChanges();
    }
  public class ApplicationDbContext : DbContext, IApplicationDbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public ApplicationDbContext(){}

    public DbSet<TodoEntity> Todos { get; set; }
  }
}