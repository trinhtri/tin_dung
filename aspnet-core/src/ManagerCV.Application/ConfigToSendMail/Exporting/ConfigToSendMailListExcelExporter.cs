using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using ManagerCV.ConfigToSendMail.Dto;
using ManagerCV.Shared;
using System.Collections.Generic;

namespace ManagerCV.ConfigToSendMail.Exporting
{
    public class ConfigToSendMailListExcelExporter : EpPlusExcelExporterBase, IConfigToSendMailExcelExporter
    {
        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;
        public ConfigToSendMailListExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }
        public  FileDto ExportToExcel(List<GetConfigToSendMailListDto> list)
        {
            return CreateExcelPackage(
           "ConfigToSendMail.xlsx",
           excelPackage =>
           {
               var sheet = excelPackage.Workbook.Worksheets.Add(L("ConfigToSendMail"));
               sheet.OutLineApplyStyle = true;

               AddHeader(
                   sheet,
                   L("Title")
                   ) ;

               AddObjects(
                   sheet, 2, list,
                   _ => _.Title
                   );
               for (var i = 1; i <= 1; i++)
               {
                   sheet.Column(i).AutoFit();
               }
           });

        }
    }
}
