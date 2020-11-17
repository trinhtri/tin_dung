using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV
{
    public interface IAppFolders
    {
        string TempFileDownloadFolder { get; }

        string SampleProfileImagesFolder { get; }

        string WebLogsFolder { get; set; }

        string AttachmentsFolder { get; }

        string TempFileUploadFolder { get; }

        string TempFileUploadJDFolder { get; set; }

        string TemFileHopDongFolder { get; set; }
        string TemFileThanhToanFolder { get; set; }
        string AttachHopDongFolder { get; set; }
        string AttachThanhToanFolder { get; set; }

    }
}
