using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
    [Table("Companys")]
    public class Company : FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public string TenCTy { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string SoUVUT { get; set; }
        public string VTUVUT { get; set; }
    }
}
