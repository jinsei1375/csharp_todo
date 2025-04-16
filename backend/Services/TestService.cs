
namespace backend.Services
{
  public interface IGuidService
  {
      string GetGuid();
  }

  public class GuidService : IGuidService
  {
      private readonly string _guid;

      public GuidService()
      {
          _guid = Guid.NewGuid().ToString();
          Console.WriteLine($"New GuidService Created: {_guid}");
      }

      public string GetGuid()
      {
          return _guid;
      }
  }

}