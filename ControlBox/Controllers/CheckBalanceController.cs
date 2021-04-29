using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ControlBox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CheckBalanceController : ControllerBase
    {
        private readonly ILogger<CheckBalanceController> _logger;

        public CheckBalanceController(ILogger<CheckBalanceController> logger)
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
        public IActionResult Post([FromForm] string username) {
            //  Ensure the username is properly lowercase, and put in a balance entry if none exists
            username = username.ToLower();
            if (!Program.PROGRAM_STORAGE.UserData.ContainsKey(username)) {
                return Ok(new { success = true, balance = 0, message = "" });
            }

            var entry = Program.PROGRAM_STORAGE.UserData[username];
            return Ok(new { success = true, balance = entry.Balance, message = "" });
        }
    }
}