using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ControlBox;

namespace ControlBox.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Controller : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<Controller> _logger;

        public Controller(ILogger<Controller> logger)
        {
            _logger = logger;
        }

        //[HttpGet]
        //public string Get()
        //{
        //    return "Hello World!";
        //}

        [HttpGet]
        public string Get([FromQuery]string trigger = "NONE")
        {
            //KeySimulate.KeySimulateTest();
            return trigger + "_Test";
        }
    }
}
