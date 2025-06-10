using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{

  [ApiController]
  [Route("api/permissions")]
  public class PermissionController : ControllerBase
  {
      [Flags]
      public enum Permission
      {
          None = 0,
          Read = 1,
          Write = 2,
          Execute = 4
      }

      [HttpPost]
      public IActionResult Post([FromBody] int permissions)
      {
          // ビットフラグを Permission 型に変換
          var permissionFlags = (Permission)permissions;

          // 各権限の確認
          var hasRead = permissionFlags.HasFlag(Permission.Read);
          var hasWrite = permissionFlags.HasFlag(Permission.Write);
          var hasExecute = permissionFlags.HasFlag(Permission.Execute);

          // デバッグ用に権限の状態を出力
          Console.WriteLine($"Received permissions: {permissions}");
          Console.WriteLine($"Has Read: {hasRead}");
          Console.WriteLine($"Has Write: {hasWrite}");
          Console.WriteLine($"Has Execute: {hasExecute}");

          // 権限の状態をレスポンスとして返す
          return Ok(new
          {
              permissions = permissions,
              hasRead = hasRead,
              hasWrite = hasWrite,
              hasExecute = hasExecute
          });
      }
  }
}
