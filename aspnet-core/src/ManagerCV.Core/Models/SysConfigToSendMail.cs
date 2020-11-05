using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
	[Table("SysConfigToSendMails")]
	public class SysConfigToSendMail: FullAuditedEntity, IMustHaveTenant
	{
		public int TenantId { get; set; }
		public string Title { get; set; }
		public string ServerURL { get; set; }
		public int Port { get; set; }
		public string UserName { get; set; }
		public string PassWord { get; set; }
		public int UseSSL { get; set; }
		public string ToMail { get; set; }
		public string CCMail { get; set; }
		public string Content { get; set; }
		public bool IsActive { get; set; }
	}
}
