using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace portal.Controllers
{
    public abstract class portalControllerBase: AbpController
    {
        protected portalControllerBase()
        {
            LocalizationSourceName = portalConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
