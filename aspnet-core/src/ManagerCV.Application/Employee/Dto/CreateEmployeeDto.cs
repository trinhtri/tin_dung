using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
    [AutoMapTo(typeof(Models.Employee))]
  public class CreateEmployeeDto: EntityDto
    {
        public int? TenantId { get; set; }
        public string HoTen { get; set; }
        public string NamSinh { get; set; }
        public int GioiTinh { get; set; }
        public string NgonNgu { get; set; }
        public string DanhGiaNgonNgu { get; set; }
        public string QueQuan { get; set; }
        public string ChoOHienTai { get; set; }
        public string NguyenVong { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string BangCap { get; set; }
        public string Truong { get; set; }
        public string Nganh { get; set; }
        public string NamTotNghiep { get; set; }
        public string FaceBook { get; set; }
        public string KinhNghiem { get; set; }
        public string LuongMongMuon { get; set; }
        public string NoiDung { get; set; }
        public string CtyNhan { get; set; }
        public DateTime? NgayHoTro { get; set; }
        public bool KetQua { get; set; }
        public bool TrangThai { get; set; }
    }
}
