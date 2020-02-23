using Abp.Authorization;
using ManagerCV.Authorization.Roles;
using ManagerCV.Authorization.Users;

namespace ManagerCV.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
