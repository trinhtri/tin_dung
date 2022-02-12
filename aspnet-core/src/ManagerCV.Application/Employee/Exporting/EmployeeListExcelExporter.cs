using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using ManagerCV.Employee.Dto;
using ManagerCV.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Exporting
{
    public class EmployeeListExcelExporter : EpPlusExcelExporterBase, IEmployeeListExcelExporter
    {
        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public EmployeeListExcelExporter(
          ITimeZoneConverter timeZoneConverter,
          IAbpSession abpSession)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto Export(List<EmployeeListDto> list)
        {
            return CreateExcelPackage(
                       "Hrm-nguyen-hong.xlsx",
                       excelPackage =>
                       {
                           var sheet = excelPackage.Workbook.Worksheets.Add(L("NguyenHong"));
                           sheet.OutLineApplyStyle = true;
                           AddHeader(
                               sheet,
                               L("Họ tên"),
                               L("Năm sinh"),
                               L("Giới tính"),
                               L("Ngôn ngữ"),
                               L("Đánh giá ngôn ngữ"),
                               L("Quê Quán"),
                               L("Chỗ ở hiện tại"),
                               L("Nguyện vọng"),
                               L("Số điện thoại"),
                               L("Email"),
                               L("Bằng cấp"),
                               L("Trường"),
                               L("Facebook"),
                               L("Kinh nghiệm"),
                               L("Lương mong muốn"),
                               L("Nội dung")
                               );
                           AddObjects(sheet, 2, list,
                               _ => _.HoTen,
                               _ => _.NamSinh,
                               _ => ConvertGioiTinh(_.GioiTinh),
                                _ => _.NhungNgonNgu,
                               _ => _.DanhGiaNgonNgu,
                                _ => _.QueQuan,
                               _ => _.ChoOHienTai,
                                _ => _.NguyenVong,
                               _ => _.SDT,
                                _ => _.Email,
                               _ => GetBangCap(_.BangCap),
                                _ => _.Truong,
                               _ => _.FaceBook,
                                _ => _.KinhNghiem,
                               _ => _.LuongMongMuon,
                               _ => _.NoiDung
                               );
                           for (int i = 1; i <= 19; i++)
                           {
                               sheet.Column(i).AutoFit();
                           }
                           var uploadDate = sheet.Column(19);
                           uploadDate.Style.Numberformat.Format = "yyyy-mm-dd";
                       });
        }
        private string ConvertGioiTinh(int id)
        {
            if(id == 1)
            {
                return "Nam";
            } else if( id== 2)
            {
                return "Nữ";
            } else
            {
                return "Giới tính thứ 3";
            }

        }

        private string GetBangCap(string id)
        {
            var result = "";
            switch (Int32.Parse(id))
            {
                case 1:
                    result = "Đại học";
                    break;
                case 2:
                    result =  "Cao đẳng";
                    break;
                case 3:
                    result = "Trung cấp";
                    break;
                case 4:
                    result = "THPT";
                    break;
                case 5:
                    result = "Semon";
                    break;
            }

            return result;
        }
        public FileDto Export_CVNhan(List<EmployeeListDto> list)
        {
            return CreateExcelPackage(
               "Hrm-nguyen-hong.xlsx",
               excelPackage =>
               {
                   var sheet = excelPackage.Workbook.Worksheets.Add(L("Hrm-NguyenHong"));
                   sheet.OutLineApplyStyle = true;
                   AddHeader(
                       sheet,
                       L("Họ tên"),
                        L("Email"),
                       L("Số điện thoại"),
                       L("Vị trí ứng tuyển"),
                       L("Công ty"),
                       L("Ngày hỗ trợ")
                       );
                   AddObjects(sheet, 2, list,
                       _ => _.HoTen,
                       _ => _.Email,
                       _ => _.SDT,
                        _ => _.KinhNghiem,
                       _ => _.CtyNhan,
                       _ => _timeZoneConverter.Convert(_.NgayHoTro)
                       );
                   for (int i = 1; i <= 19; i++)
                   {
                       sheet.Column(i).AutoFit();
                   }
                   var uploadDate = sheet.Column(18);
                   uploadDate.Style.Numberformat.Format = "yyyy-mm-dd";
               });
        }
    }
}

      
