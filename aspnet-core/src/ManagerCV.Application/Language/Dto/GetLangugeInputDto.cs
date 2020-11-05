using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Language.Dto
{
	public class GetLangugeInputDto : PagedAndSortedResultRequestDto, IShouldNormalize
	{
		public string Filter { get; set; }
		public void Normalize()
		{
			if (Sorting.IsNullOrEmpty())
			{
				Sorting = "NgonNgu";
			}
		}
	}
}

