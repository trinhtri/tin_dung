using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
	[Table("CtgLanguages")]
	public class CtgLanguage : FullAuditedEntity, IMustHaveTenant
	{
		public int TenantId { get; set; }
		[StringLength(200)]
		public string NgonNgu { get; set; }
	}
}
