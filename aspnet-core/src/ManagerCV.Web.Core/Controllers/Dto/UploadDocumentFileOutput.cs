using Abp.Web.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Controllers.Dto
{
   public class UploadDocumentFileOutput
    {
        public string FileName { get; set; }

        public decimal FileSize { get; set; }

        public string ContentType { get; set; }

        public ErrorInfo ErrorInfo { get; set; }
    }
}
