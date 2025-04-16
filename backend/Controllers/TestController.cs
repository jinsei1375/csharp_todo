using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/guid")]
  public class TestController : ControllerBase
  {
      private readonly IGuidService _service1;
      private readonly IGuidService _service2;

      public TestController(IGuidService service1, IGuidService service2)
      {
          _service1 = service1;
          _service2 = service2;
      }

      [HttpGet]
      public IActionResult Get()
      {
          return Ok(new
          {
              First = _service1.GetGuid(),
              Second = _service2.GetGuid()
          });
      }

      [HttpGet("ver2")]
      public IActionResult GetVer2()
      {
          return Ok(new
          {
              First = _service1.GetGuid(),
              Second = _service2.GetGuid()
          });
      }
  }
}