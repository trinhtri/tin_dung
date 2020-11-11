using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
    public class EmployeeInputDto : PagedAndSortedResultRequestDto, IShouldNormalize
    {
        public string Filter { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }    
        public List<string> BangCap { get; set; }

        public List<int> NgonNgu { get; set; }
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "CreationTime DESC";
            }
        }
        public EmployeeInputDto()
        {
            NgonNgu = new List<int>();
            BangCap = new List<string>();
        }
    }
}
