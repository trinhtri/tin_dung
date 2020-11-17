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
        public string SoUVUT { get; set; }
        public string VTUVUT { get; set; }
    }
}
