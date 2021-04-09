using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace ControlBox
{
    public class Program
    {
        public static ProgramStorage PROGRAM_STORAGE { get; set; }

        public static void Main(string[] args)
        {
            PROGRAM_STORAGE = new ProgramStorage();

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
