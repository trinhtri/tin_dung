using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Dto
{
   public class SenJDForCustomerDto
	{
        public int? TenantId { get; set; }
        public string Title { get; set; }
        public int UseSSL { get; set; }
        public string ToMail { get; set; }
        public string CCMail { get; set; }
        public string Content { get; set; }
        public string JDName { get; set; } 
        public bool IsAttackJD { get; set; }

    }
}
