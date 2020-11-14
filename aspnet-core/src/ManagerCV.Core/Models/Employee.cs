using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ManagerCV.Models
{
    [Table("Employees")]
    public class Employee: FullAuditedEntity, IMustHaveTenant
    {
        public int TenantId { get; set; }
        [StringLength(100)]
        public string HoTen { get; set; }
        [StringLength(20)]
        public string NamSinh { get; set; }
        public int GioiTinh { get; set; }
        [StringLength(1000)]
        public string NgonNgu { get; set; }
        [StringLength(2000)]

        public string DanhGiaNgonNgu { get; set; }
        [StringLength(2000)]
        public string QueQuan { get; set; }
        [StringLength(2000)]
        public string ChoOHienTai { get; set; }
        [StringLength(2000)]
        public string NguyenVong { get; set; }
        [StringLength(30)]
        public string SDT { get; set; }
        [StringLength(100)]
        public string Email { get; set; }
        [StringLength(500)]
        public string BangCap { get; set; }
        [StringLength(600)]
        public string Truong { get; set; }
     
        [StringLength(1000)]
        public string FaceBook { get; set; }
        [StringLength(2000)]
        public string KinhNghiem { get; set; }
        [StringLength(1000)]
        public string LuongMongMuon { get; set; }
        public string NoiDung { get; set; }
        [StringLength(2000)]
        public string CtyNhan { get; set; }
        public DateTime? NgayHoTro { get; set; }

        public string Note { get; set; }

        // 1 vừa thêm mới
        // 2 đã gửi đến cty
        // 3 cty có lịch pv
        // 4.pv chưa phản hồi
        // 5.cv chưa đạt -> 1
        public int TrangThai { get; set; }
        [StringLength(2000)]
        public string CVName { get; set; }
        [StringLength(2000)]
        public string CVUrl { get; set; }
        public DateTime? NgayNhanCV { get; set; }
        public string ContentType { get; set; }
        public DateTime? NgayPhongVan { get; set; }
        public virtual List<EmployeeLanguage> EmployeeLanguages { get; set; }

    }
}
