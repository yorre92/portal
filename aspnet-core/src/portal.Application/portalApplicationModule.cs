using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using portal.Authorization;

namespace portal
{
    [DependsOn(
        typeof(portalCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class portalApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<portalAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(portalApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
