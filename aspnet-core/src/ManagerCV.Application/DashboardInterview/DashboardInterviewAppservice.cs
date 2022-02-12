using Abp.Domain.Repositories;
using ManagerCV.DashboardInterview.Dto;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManagerCV.DashboardInterview
{
    public class DashboardInterviewAppservice : ManagerCVAppServiceBase, IDashboardInterviewAppservice
    {
        private readonly IRepository<Models.Employee> _employeeRepository;
        private readonly IRepository<Models.SendCV> _sendCVRepository;
        public DashboardInterviewAppservice(IRepository<Models.Employee> employeeRepository, IRepository<Models.SendCV> sendCVRepository)
        {
            _employeeRepository = employeeRepository;
            _sendCVRepository = sendCVRepository;
        }
        public async Task<List<GetEmployeeForChartDto>> GetDataForDashboard()
        {
            var emps = await _sendCVRepository.GetAll()
                .Where(x=>x.NgayPhongVan.HasValue)
                .Select(a => new GetEmployeeForChartDto
                {
                    Id = a.Id,
                    Title = a.TenCty,
                    Start = a.NgayPhongVan ?? DateTime.Now
                })
                .ToListAsync();
            return emps;
        }
    }
}
