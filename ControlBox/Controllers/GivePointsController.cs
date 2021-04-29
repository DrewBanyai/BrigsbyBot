using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ControlBox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GivePointsController : ControllerBase
    {
        private readonly ILogger<GivePointsController> _logger;

        public GivePointsController(ILogger<GivePointsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "No GET enabled on this API route. Please try a POST with a raw JSON array of key press data.";
        }

        [HttpPost]
        [Consumes("application/x-www-form-urlencoded")]
        public IActionResult Post([FromForm] string username, [FromForm] int points) {
            //  Ensure the username is properly lowercase, and put in a balance entry if none exists
            username = username.ToLower();
            if (!Program.PROGRAM_STORAGE.UserData.ContainsKey(username)) {
                Program.PROGRAM_STORAGE.UserData[username] = new BalanceEntry{ Username = username, Balance = points };
                Program.PROGRAM_STORAGE.SaveData();
                return Ok(new { success = true, balance = points, message = "" });
            }

            var entry = Program.PROGRAM_STORAGE.UserData[username];
            Program.PROGRAM_STORAGE.UserData[username] = new BalanceEntry{ Username = username, Balance = entry.Balance + points };
            Program.PROGRAM_STORAGE.SaveData();
            
            return Ok(new { success = true, balance = entry.Balance + points, message = "" });
        }
    }
}