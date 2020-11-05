using Abp.Application.Services.Dto;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Dto
{
   public class GetConfigToSendMailInput: PagedAndSortedResultRequestDto, IShouldNormalize
    {
        public string Filter { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Title";
            }

            Filter = Filter?.Trim();
        }
    }
}
