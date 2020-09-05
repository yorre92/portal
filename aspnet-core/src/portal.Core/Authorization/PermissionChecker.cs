using Abp.Authorization;
using portal.Authorization.Roles;
using portal.Authorization.Users;

namespace portal.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
