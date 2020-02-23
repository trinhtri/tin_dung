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
                      .WhereIf(!input.Filter.IsNullOrEmpty(),
                       x => x.HoTen.Contains(input.Filter)
                      || x.NgonNgu.Contains(input.Filter) 
                      || x.ChoOHienTai.Contains(input.Filter) 
                      || x.SDT.Contains(input.Filter)
                      || x.Email.Contains(input.Filter)
                      || x.SDT.Contains(input.Filter)
                      );
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
