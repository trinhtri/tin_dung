using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Language.Dto
{
	public class LanguageDto : Entity
	{
		public int TenantId { get; set; }
		public string NgonNgu { get; set; }

	}
}
