using System.Threading.Tasks;
using Abp.Application.Services;
using ManagerCV.Sessions.Dto;

namespace ManagerCV.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
