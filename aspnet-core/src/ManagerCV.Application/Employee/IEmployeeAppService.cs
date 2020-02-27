using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ManagerCV.Employee
{
    public interface IEmployeeAppService: IApplicationService
    {
        Task<PagedResultDto<EmployeeListDto>> GetAll(EmployeeInputDto input);

        Task<PagedResultDto<EmployeeListDto>> GetAll_Gui(EmployeeGuiInputDto input);
        Task<long> Create(CreateEmployeeDto input);
        Task Update(CreateEmployeeDto input);
        Task Delete(int id);
        Task<CreateEmployeeDto> GetId(int id);

        Task CVGuiDi(CVGuiDi input);
    }
}
