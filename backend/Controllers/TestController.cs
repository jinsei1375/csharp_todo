using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/test")]
  public class TestController : ControllerBase
  {
    [HttpGet("sync")]
    public ActionResult<List<string>> GetData()
    {
      Thread.Sleep(3000); 
      return new List<string> { "同期データ" };
    }

    [HttpGet("async")]
    public async Task<ActionResult<List<string>>> GetDataAsync()
    {
      await Task.Delay(3000); 
      return new List<string> { "非同期データ" };
    }
  }
}