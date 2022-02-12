using Abp.Dependency;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV
{
    public class AppFolders : IAppFolders, ISingletonDependency
    {
        public string TempFileDownloadFolder { get; set; }

        public string SampleProfileImagesFolder { get; set; }

        public string WebLogsFolder { get; set; }

        public string AttachmentsFolder { get; set; }

        public string TempFileUploadFolder { get; set; }
        public string TempFileUploadJDFolder { get; set; }
        public string TemFileHopDongFolder { get; set; }
        public string TemFileThanhToanFolder { get; set; }
        public string AttachHopDongFolder { get; set; }
        public string AttachThanhToanFolder { get; set; }
    }
}
