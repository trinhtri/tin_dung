using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ManagerCV.Authorization.Roles;
using ManagerCV.Authorization.Users;
using ManagerCV.MultiTenancy;

namespace ManagerCV.EntityFrameworkCore
{
    public class ManagerCVDbContext : AbpZeroDbContext<Tenant, Role, User, ManagerCVDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public ManagerCVDbContext(DbContextOptions<ManagerCVDbContext> options)
            : base(options)
        {
        }
    }
}
