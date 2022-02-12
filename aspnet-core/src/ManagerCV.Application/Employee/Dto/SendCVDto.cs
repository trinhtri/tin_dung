using Abp.Domain.Entities;
using ManagerCV.Const;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
    public class SendCVDto: Entity
    {
        public int TenantId { get; set; }
        public int Employee_Id { get; set; }
        public DateTime NgayGui { get; set; }
        public DateTime? NgayPhongVan { get; set; }
        public DateTime? NgayNhan { get; set; }
        public DateTime? NgayDiLam { get; set; }
        public TrangThai TrangThai { get; set; }
        public string TenCty { get; set; }
        public string Note { get; set; }
    }
}
