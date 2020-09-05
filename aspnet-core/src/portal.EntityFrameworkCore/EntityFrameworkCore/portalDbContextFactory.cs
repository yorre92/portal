using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using portal.Configuration;
using portal.Web;

namespace portal.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class portalDbContextFactory : IDesignTimeDbContextFactory<portalDbContext>
    {
        public portalDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<portalDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            portalDbContextConfigurer.Configure(builder, configuration.GetConnectionString(portalConsts.ConnectionStringName));

            return new portalDbContext(builder.Options);
        }
    }
}
