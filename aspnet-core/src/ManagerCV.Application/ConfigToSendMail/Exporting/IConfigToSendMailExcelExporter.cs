
using ManagerCV.ConfigToSendMail.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.ConfigToSendMail.Exporting
{
    public interface IConfigToSendMailExcelExporter
    {
        FileDto ExportToExcel(List<GetConfigToSendMailListDto> list);
    }
}
