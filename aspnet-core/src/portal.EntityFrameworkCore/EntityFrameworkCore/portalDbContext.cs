using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using portal.Authorization.Roles;
using portal.Authorization.Users;
using portal.MultiTenancy;
using portal.Services;
using portal.Orders;
using portal.Workflows;

namespace portal.EntityFrameworkCore
{
  public class portalDbContext : AbpZeroDbContext<Tenant, Role, User, portalDbContext>
  {
    /* Define a DbSet for each entity of the application */

    public DbSet<Service> Services { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<Workflow> Workflows { get; set; }

    public DbSet<WorkflowStep> WorkflowSteps { get; set; }

    public portalDbContext(DbContextOptions<portalDbContext> options)
            : base(options)
    {
    }
  }
}
