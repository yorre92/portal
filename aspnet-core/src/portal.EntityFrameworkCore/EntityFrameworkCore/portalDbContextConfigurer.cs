using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace portal.EntityFrameworkCore
{
    public static class portalDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<portalDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<portalDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
