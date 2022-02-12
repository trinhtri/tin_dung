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
        public string SoUVTT { get; set; }
        public string Note { get; set; }
        public string ContentTypeHD { get; set; }
        public string HopDong { get; set; }
        public string UrlHopDong { get; set; }
        public string ContentTypeTT { get; set; }
        public string ThanhToan { get; set; }
        public string UrlThanhToan { get; set; }
    }
}
