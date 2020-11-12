using Abp.Application.Services;
using ManagerCV.DashboardInterview.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ManagerCV.DashboardInterview
{
   public interface IDashboardInterviewAppservice: IApplicationService
    {
        Task<List<GetEmployeeForChartDto>> GetDataForDashboard();
    }
}
