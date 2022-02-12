using System;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using ManagerCV.Authentication.JwtBearer;
using ManagerCV.Configuration;
using ManagerCV.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using System.IO;
using Abp.IO;

namespace ManagerCV
{
    [DependsOn(
         typeof(ManagerCVApplicationModule),
         typeof(ManagerCVEntityFrameworkModule),
         typeof(AbpAspNetCoreModule)
        ,typeof(AbpAspNetCoreSignalRModule)
     )]
    public class ManagerCVWebCoreModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ManagerCVWebCoreModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                ManagerCVConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(ManagerCVApplicationModule).GetAssembly()
                 );

            ConfigureTokenAuth();
        }

        private void ConfigureTokenAuth()
        {
            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration["Authentication:JwtBearer:SecurityKey"]));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(1);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ManagerCVWebCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            SetAppFolders();
            //IocManager.Resolve<ApplicationPartManager>()
            //    .AddApplicationPartsIfNotAddedBefore(typeof(ManagerCVWebCoreModule).Assembly);
        }
         private void SetAppFolders()
        {
            var appFolders = IocManager.Resolve<AppFolders>();

            appFolders.TempFileDownloadFolder = Path.Combine(_env.WebRootPath, $"Temp{Path.DirectorySeparatorChar}Downloads");
            appFolders.TemFileHopDongFolder = Path.Combine(_env.WebRootPath, $"Temp{Path.DirectorySeparatorChar}HopDong");
            appFolders.TemFileThanhToanFolder = Path.Combine(_env.WebRootPath, $"Temp{Path.DirectorySeparatorChar}ThanhToan");
            appFolders.TempFileUploadFolder = Path.Combine(_env.WebRootPath, $"Temp{Path.DirectorySeparatorChar}Uploads");
            appFolders.TempFileUploadJDFolder = Path.Combine(_env.WebRootPath, $"Temp{Path.DirectorySeparatorChar}JD");
            appFolders.AttachmentsFolder = Path.Combine(_env.WebRootPath, $"Files{Path.DirectorySeparatorChar}Documents");
            appFolders.AttachHopDongFolder = Path.Combine(_env.WebRootPath, $"Files{Path.DirectorySeparatorChar}HopDong");
            appFolders.AttachThanhToanFolder = Path.Combine(_env.WebRootPath, $"Files{Path.DirectorySeparatorChar}ThanhToan");
           
            DirectoryHelper.CreateIfNotExists(appFolders.TempFileDownloadFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.TemFileHopDongFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.AttachHopDongFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.TempFileUploadFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.AttachmentsFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.TempFileUploadJDFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.AttachThanhToanFolder);
            DirectoryHelper.CreateIfNotExists(appFolders.TemFileThanhToanFolder);
        }
    }
}
