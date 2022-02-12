using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
   public class CVGuiDi
    {
        public int EmployeeId { get; set; }
        public string CtyNhan { get; set; }
        public DateTime? NgayHoTro { get; set; }
        public string KetQua { get; set; }
        public int TrangThai { get; set; }
        public DateTime? NgayPhongVan { get; set; }
    }
}
