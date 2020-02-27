using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using ManagerCV.Employee.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
namespace ManagerCV.Employee
{
    public class EmployeeAppService : ManagerCVAppServiceBase, IEmployeeAppService
    {
        private readonly IRepository<Models.Employee> _employeeRepository;
        public EmployeeAppService(IRepository<Models.Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<long> Create(CreateEmployeeDto input)
        {
            input.TenantId = AbpSession.TenantId;
            var emp = ObjectMapper.Map<Models.Employee>(input);
            await _employeeRepository.InsertAsync(emp);
            await CurrentUnitOfWork.SaveChangesAsync();
            return emp.Id;
        }

        public async Task CVGuiDi(CVGuiDi input)
        {
            var dto = await _employeeRepository.FirstOrDefaultAsync(x => x.Id == input.EmployeeId);
            dto.CtyNhan = input.CtyNhan;
            dto.NgayHoTro = input.NgayHoTro;
        }

        public async Task Delete(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }

        public async Task<PagedResultDto<EmployeeListDto>> GetAll(EmployeeInputDto input)
        {
            if (!input.Filter.IsNullOrEmpty())
            {
                input.Filter = Regex.Replace(input.Filter.Trim(), @"\s+", " ");
            }
            var query = _employeeRepository.GetAll()
                      .Where(x => x.TrangThai == false)
                      .WhereIf(!input.Filter.IsNullOrEmpty(),
                       x => x.HoTen.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NgonNgu.ToUpper().Contains(input.Filter.ToUpper())
                      || x.ChoOHienTai.ToUpper().Contains(input.Filter.ToUpper())
                      || x.Email.ToUpper().Contains(input.Filter.ToUpper())
                      || x.SDT.ToUpper().Contains(input.Filter.ToUpper())
                      || x.KinhNghiem.ToUpper().Contains(input.Filter.ToUpper())
                      || x.BangCap.ToUpper().Contains(input.Filter.ToUpper())
                      ).WhereIf(input.StartDate.HasValue, x => x.NgayNhanCV >= input.StartDate)
                       .WhereIf(input.EndDate.HasValue, x => x.NgayNhanCV <= input.EndDate); 
            var tatolCount = await query.CountAsync();
            var result = await query.OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();
            return new PagedResultDto<EmployeeListDto>(tatolCount, ObjectMapper.Map<List<EmployeeListDto>>(result));
        }

        public async Task<PagedResultDto<EmployeeListDto>> GetAll_Gui(EmployeeGuiInputDto input)
        {
            if (!input.Filter.IsNullOrEmpty())
            {
                input.Filter = Regex.Replace(input.Filter.Trim(), @"\s+", " ");
            }
            var query = _employeeRepository.GetAll()
                      .Where(x => x.TrangThai == true)
                      .WhereIf(!input.Filter.IsNullOrEmpty(),
                       x => x.HoTen.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NgonNgu.ToUpper().Contains(input.Filter.ToUpper())
                      || x.CtyNhan.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NguyenVong.ToUpper().Contains(input.Filter.ToUpper())
                      || x.SDT.ToUpper().Contains(input.Filter.ToUpper())
                      || x.Email.ToUpper().Contains(input.Filter.ToUpper())
                      ).WhereIf(input.StartDate.HasValue, x=>x.NgayHoTro >= input.StartDate)
                       .WhereIf(input.EndDate.HasValue, x => x.NgayHoTro <= input.EndDate)
                        .WhereIf(input.KetQua.HasValue, x => x.KetQua == input.KetQua);
            var tatolCount = await query.CountAsync();
            var result = await query.OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();
            return new PagedResultDto<EmployeeListDto>(tatolCount, ObjectMapper.Map<List<EmployeeListDto>>(result));
        }

        public async Task<CreateEmployeeDto> GetId(int id)
        {
            var dto = await _employeeRepository.FirstOrDefaultAsync(id);
            return ObjectMapper.Map<CreateEmployeeDto>(dto);
 
        }

        public async Task Update(CreateEmployeeDto input)
        {
            var dto = await _employeeRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
            ObjectMapper.Map(input, dto);
        }
    }
}
