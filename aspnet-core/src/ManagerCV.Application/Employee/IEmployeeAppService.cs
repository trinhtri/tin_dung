using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.Employee.Dto;
using Microsoft.AspNetCore.Mvc;
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
        Task<FileDto> GetCVToExcel(EmployeeInputDto input);
        Task<FileDto> GetGuiCVToExcel(EmployeeGuiInputDto inputDto);
        Task<long> Create(CreateEmployeeDto input);
        [HttpPost]
        Task CapNhat(CreateEmployeeDto input);
        Task Delete(int id);
        Task<CreateEmployeeDto> GetId(int id);

        Task CVGuiDi(CVGuiDi input);

        Task DaNhan(int id);
        Task HuyNhan(int id);

        Task ChuyenVeQLCV(int id);

        Task GuiCV(int id,string tencty,DateTime? NgayPV);

    
    }
}
