using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ManagerCV.EntityFrameworkCore
{
    public static class ManagerCVDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ManagerCVDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ManagerCVDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
