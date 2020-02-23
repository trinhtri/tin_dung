using Abp.Application.Services;
using ManagerCV.MultiTenancy.Dto;

namespace ManagerCV.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

