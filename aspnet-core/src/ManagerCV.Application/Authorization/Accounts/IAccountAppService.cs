using System.Threading.Tasks;
using Abp.Application.Services;
using ManagerCV.Authorization.Accounts.Dto;

namespace ManagerCV.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
