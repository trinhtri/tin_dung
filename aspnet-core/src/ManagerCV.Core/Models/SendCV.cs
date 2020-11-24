using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using ManagerCV.Const;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
    [Table("SendCV")]
    public class SendCV : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public int Employee_Id { get; set; }
        public Employee Employee_ { get; set; }
        public DateTime NgayGui { get; set; }
        public DateTime? NgayPhongVan { get; set; }
        public DateTime? NgayNhan { get; set; }
        public DateTime? NgayDiLam { get; set; }
        public TrangThai TrangThai { get; set; }
        public string TenCty { get; set; }
        public string Note { get; set; }
    }
}
