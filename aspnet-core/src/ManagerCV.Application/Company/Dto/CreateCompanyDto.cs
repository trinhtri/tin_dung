using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Company.Dto
{
    public class CreateCompanyDto : Entity
    {
        public int? TenantId { get; set; }
        public string TenCTy { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string SoUVTT { get; set; }
        public string Note { get; set; }
        public string ContentTypeHD { get; set; }
        public string HopDong { get; set; }
        public string ContentTypeTT { get; set; }
        public string ThanhToan { get; set; }

    }
}
