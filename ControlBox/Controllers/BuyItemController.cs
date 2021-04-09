using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ControlBox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuyItemController : ControllerBase
    {
        private readonly ILogger<BuyItemController> _logger;

        public BuyItemController(ILogger<BuyItemController> logger)
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
        public IActionResult Post([FromForm] string username, [FromForm] int itemPrice) {
            //  Ensure the username is properly lowercase, and put in a balance entry if none exists
            username = username.ToLower();
            if (!Program.PROGRAM_STORAGE.UserData.ContainsKey(username) || (Program.PROGRAM_STORAGE.UserData[username].Balance < itemPrice)) {
                var userBalance = !Program.PROGRAM_STORAGE.UserData.ContainsKey(username) ? 0 : Program.PROGRAM_STORAGE.UserData[username].Balance;
                return Ok(new { success = false, balance = userBalance, message = "@" + username + " does not have the required " + itemPrice.ToString() + " points to spend." });
            }
            Program.PROGRAM_STORAGE.UserData[username].Balance -= itemPrice;
            Program.PROGRAM_STORAGE.SaveData();
            return Ok(new { success = true, balance = Program.PROGRAM_STORAGE.UserData[username].Balance });
        }
    }
}