using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace backend.Data
{
  public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
  {
      public ApplicationDbContext CreateDbContext(string[] args)
      {
          var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

          // SQLite の接続文字列（環境に合わせて変更）
          optionsBuilder.UseSqlite("Data Source=todo.db");

          return new ApplicationDbContext(optionsBuilder.Options);
      }
  }

}

