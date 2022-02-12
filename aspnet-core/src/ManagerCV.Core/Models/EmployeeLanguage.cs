using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
    [Table("EmployeeLanguages")]
    public class EmployeeLanguage : FullAuditedEntity, IMustHaveTenant
	{
		public int TenantId { get; set; }
		public int Employee_Id { get; set; }
		public Employee Employee_ { get; set; }
		public int CtgLanguage_Id { get; set; }
		public CtgLanguage CtgLanguage_ { get; set; }

	}
}
