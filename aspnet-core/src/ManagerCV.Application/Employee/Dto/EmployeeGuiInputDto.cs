using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
   public class EmployeeGuiInputDto: PagedAndSortedResultRequestDto, IShouldNormalize
    {
        public string Filter { get; set; }
        public bool? KetQua { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? StartNgayPV { get; set; }
        public DateTime? EndNgayPV { get; set; }
        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "HoTen,NamSinh,NgonNgu,QueQuan,Email,DanhGiaNgonNgu";
            }
        }
    }
}

