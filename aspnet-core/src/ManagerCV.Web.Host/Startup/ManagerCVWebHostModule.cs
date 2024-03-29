﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ManagerCV.Configuration;

namespace ManagerCV.Web.Host.Startup
{
    [DependsOn(
       typeof(ManagerCVWebCoreModule))]
    public class ManagerCVWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ManagerCVWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ManagerCVWebHostModule).GetAssembly());
        }
    }
}
