using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Dto
{
   public class GetConfigToSendMailListDto:EntityDto
    {
        public string Title { get; set; }
    }
}
