using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using portal.EntityFrameworkCore;
using portal.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace portal.Web.Tests
{
    [DependsOn(
        typeof(portalWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class portalWebTestModule : AbpModule
    {
        public portalWebTestModule(portalEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(portalWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(portalWebMvcModule).Assembly);
        }
    }
}