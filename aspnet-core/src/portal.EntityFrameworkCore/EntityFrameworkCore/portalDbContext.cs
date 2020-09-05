using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using portal.Authorization.Roles;
using portal.Authorization.Users;
using portal.MultiTenancy;

namespace portal.EntityFrameworkCore
{
    public class portalDbContext : AbpZeroDbContext<Tenant, Role, User, portalDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public portalDbContext(DbContextOptions<portalDbContext> options)
            : base(options)
        {
        }
    }
}
