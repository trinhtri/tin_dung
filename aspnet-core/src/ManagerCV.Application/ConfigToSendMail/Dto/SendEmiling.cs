using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Dto
{
   public class SendEmiling
    {
        //public int? TenantId { get; set; }
        //public string ServerURL { get; set; }
        //public int Port { get; set; }
        //public string UserName { get; set; }
        //public string PassWord { get; set; }
        //public int UseSSL { get; set; }
        public string ToMail { get; set; }
        public string Content { get; set; }
        public bool IsAttackFile { get; set; }
        public bool IsUrl { get; set; }
        public string URL { get; set; }
        public string AttackFile { get; set; }

    }
}
