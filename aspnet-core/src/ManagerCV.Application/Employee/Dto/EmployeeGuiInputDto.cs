using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Runtime.Validation;
using ManagerCV.Const;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
   public class EmployeeGuiInputDto: PagedAndSortedResultRequestDto, IShouldNormalize
    {
        public string Filter { get; set; }
        public TrangThai TrangThai { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? StartNgayPV { get; set; }
        public DateTime? EndNgayPV { get; set; }
        public List<string> BangCap { get; set; }
        public List<int> NgonNgu { get; set; }

        public void Normalize()
        {
            if (Sorting.IsNullOrEmpty())
            {
                Sorting = "HoTen,NamSinh,NgonNgu,QueQuan,Email,DanhGiaNgonNgu";
            }
        }
        public EmployeeGuiInputDto()
        {
            NgonNgu = new List<int>();
            BangCap = new List<string>();
        }
    }
}

