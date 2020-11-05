using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Dto
{
      public class CreateConfigToSendMailDto: EntityDto
    {
        public int? TenantId { get; set; }
        public string Title { get; set; }
        public string ServerURL { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public int UseSSL { get; set; }
        public string ToMail { get; set; }
        public string CCMail { get; set; }
        public string Content { get; set; }
        public string ReportPath { get; set; }
        public bool IsActive { get; set; }
        public bool IsAttackURL { get; set; }
        public bool IsAttackReport { get; set; }
        public string URL { get; set; }

    }
}
