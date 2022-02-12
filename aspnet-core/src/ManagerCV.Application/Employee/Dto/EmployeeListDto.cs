﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ManagerCV.Const;
using ManagerCV.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV.Employee.Dto
{
    [AutoMapTo(typeof(Models.Employee))]
  public  class EmployeeListDto : EntityDto
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
        public string NamTotNghiep { get; set; }
        public string FaceBook { get; set; }
        public string KinhNghiem { get; set; }
        public string LuongMongMuon { get; set; }
        public string NoiDung { get; set; }
        public string CtyNhan { get; set; }
        public DateTime? NgayHoTro { get; set; }
        public string Note { get; set; }
        public TrangThai TrangThai { get; set; }
        public string CVName { get; set; }
        public string CVUrl { get; set; }
        //public DateTime? NgayNhanCV { get; set; }
        public string NhungNgonNgu { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime? NgayPhongVan { get; set; }
        public DateTime? NgayDiLam { get; set; }
        public int? Employee_ID { get; set; }
    }
}
