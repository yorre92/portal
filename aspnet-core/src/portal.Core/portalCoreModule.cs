using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using portal.Authorization.Roles;
using portal.Authorization.Users;
using portal.Configuration;
using portal.Localization;
using portal.MultiTenancy;
using portal.Timing;

namespace portal
{
  [DependsOn(typeof(AbpZeroCoreModule))]
  public class portalCoreModule : AbpModule
  {
    public override void PreInitialize()
    {
      Configuration.Auditing.IsEnabledForAnonymousUsers = true;

      // Declare entity types
      Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
      Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
      Configuration.Modules.Zero().EntityTypes.User = typeof(User);

      portalLocalizationConfigurer.Configure(Configuration.Localization);

      // Enable this line to create a multi-tenant application.
      Configuration.MultiTenancy.IsEnabled = portalConsts.MultiTenancyEnabled;

      // Configure roles
      AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);

      Configuration.Settings.Providers.Add<AppSettingProvider>();
    }

    public override void Initialize()
    {
      IocManager.RegisterAssemblyByConvention(typeof(portalCoreModule).GetAssembly());
    }

    public override void PostInitialize()
    {
      IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
    }
  }
}
