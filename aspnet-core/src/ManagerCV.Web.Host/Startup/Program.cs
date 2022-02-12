﻿using Abp.Timing;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ManagerCV.Web.Host.Startup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Clock.Provider = ClockProviders.Local;
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
        }
    }
}
