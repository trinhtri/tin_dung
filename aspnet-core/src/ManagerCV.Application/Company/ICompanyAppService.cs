using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.Company.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ManagerCV.Company
{
    public interface ICompanyAppService: IApplicationService
    {
        Task<PagedResultDto<CompanyListDto>> GetAll(GetCompanyInputDto input);
        Task<int> Create(CreateCompanyDto input);
        Task Update(CreateCompanyDto input);
        Task<CreateCompanyDto> GetId(int Id);
        Task Delete(int id);
    }
}
