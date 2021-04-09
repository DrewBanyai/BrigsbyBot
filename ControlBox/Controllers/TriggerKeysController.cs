using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ControlBox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TriggerKeysController : ControllerBase
    {
        private readonly ILogger<TriggerKeysController> _logger;

        public TriggerKeysController(ILogger<TriggerKeysController> logger)
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
        public IActionResult PostJson([FromForm] string[] keyList) {
            KeySimulate.KeySimulateTap(keyList);
            return Ok(new { success = true });
        }
    }
}
