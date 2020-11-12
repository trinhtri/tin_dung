using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.DashboardInterview.Dto
{
    public class GetEmployeeForChartDto: Entity
    {
        public string Title { get; set; }
        public DateTime Start { get; set; }
    }
}

