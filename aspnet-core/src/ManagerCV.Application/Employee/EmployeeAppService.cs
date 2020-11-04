using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using ManagerCV.Employee.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using ManagerCV.IO;
using System.IO;
using ManagerCV.Employee.Exporting;

namespace ManagerCV.Employee
{
    public class EmployeeAppService : ManagerCVAppServiceBase, IEmployeeAppService
    {
        private readonly IRepository<Models.Employee> _employeeRepository;
        private readonly IAppFolders _appFolders;
        private readonly EmployeeListExcelExporter _employeeListExcelExporter;
        public EmployeeAppService(IRepository<Models.Employee> employeeRepository, IAppFolders appFolders, EmployeeListExcelExporter employeeListExcelExporter)
        {
            _employeeRepository = employeeRepository;
            _appFolders = appFolders;
            _employeeListExcelExporter = employeeListExcelExporter;
        }
        public async Task<long> Create(CreateEmployeeDto input)
        {
            input.TenantId = AbpSession.TenantId;
            var emp = ObjectMapper.Map<Models.Employee>(input);
            // thao tac voi file 
            // xoa file cu di
            if (emp.CVName != null)
            {
                AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.AttachmentsFolder, input.CVName);
                var sourceFile = Path.Combine(_appFolders.TempFileUploadFolder, input.CVName);
                var destFile = Path.Combine(_appFolders.AttachmentsFolder, input.CVName);
                System.IO.File.Move(sourceFile, destFile);
                var filePath = Path.Combine(_appFolders.AttachmentsFolder, input.CVName);
                emp.CVUrl = filePath;
            }
            await _employeeRepository.InsertAsync(emp);
            await CurrentUnitOfWork.SaveChangesAsync();
            return emp.Id;
        }

        public async Task CVGuiDi(CVGuiDi input)
        {
            var dto = await _employeeRepository.FirstOrDefaultAsync(x => x.Id == input.EmployeeId);
            dto.CtyNhan = input.CtyNhan;
            dto.NgayHoTro = input.NgayHoTro;
        }

        public async Task Delete(int id)
        {
            var cv = _employeeRepository.Get(id);
            //Delete old document file
            AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.AttachmentsFolder, cv.CVName);

            await _employeeRepository.DeleteAsync(id);
        }

        public async Task<PagedResultDto<EmployeeListDto>> GetAll(EmployeeInputDto input)
        {
            if (!input.Filter.IsNullOrEmpty())
            {
                input.Filter = Regex.Replace(input.Filter.Trim(), @"\s+", " ");
            }
            var query = _employeeRepository.GetAll()
                      .Where(x => x.TrangThai == false)
                      .WhereIf(!input.Filter.IsNullOrEmpty(),
                       x => x.HoTen.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NgonNgu.ToUpper().Contains(input.Filter.ToUpper())
                      || x.ChoOHienTai.ToUpper().Contains(input.Filter.ToUpper())
                      || x.Email.ToUpper().Contains(input.Filter.ToUpper())
                      || x.SDT.ToUpper().Contains(input.Filter.ToUpper())
                      || x.KinhNghiem.ToUpper().Contains(input.Filter.ToUpper())
                      || x.BangCap.ToUpper().Contains(input.Filter.ToUpper())
                      ).WhereIf(input.StartDate.HasValue, x => x.NgayNhanCV >= input.StartDate)
                       .WhereIf(input.EndDate.HasValue, x => x.NgayNhanCV <= input.EndDate); 
            var tatolCount = await query.CountAsync();
            var result = await query.OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();
            return new PagedResultDto<EmployeeListDto>(tatolCount, ObjectMapper.Map<List<EmployeeListDto>>(result));
        }

        public async Task<PagedResultDto<EmployeeListDto>> GetAll_Gui(EmployeeGuiInputDto input)
        {
            if (!input.Filter.IsNullOrEmpty())
            {
                input.Filter = Regex.Replace(input.Filter.Trim(), @"\s+", " ");
            }
            var query = _employeeRepository.GetAll()
                      .Where(x => x.TrangThai == true)
                      .WhereIf(!input.Filter.IsNullOrEmpty(),
                       x => x.HoTen.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NgonNgu.ToUpper().Contains(input.Filter.ToUpper())
                      || x.CtyNhan.ToUpper().Contains(input.Filter.ToUpper())
                      || x.NguyenVong.ToUpper().Contains(input.Filter.ToUpper())
                      || x.SDT.ToUpper().Contains(input.Filter.ToUpper())
                      || x.Email.ToUpper().Contains(input.Filter.ToUpper())
                      ).WhereIf(input.StartDate.HasValue, x=>x.NgayHoTro >= input.StartDate)
                       .WhereIf(input.EndDate.HasValue, x => x.NgayHoTro <= input.EndDate)
                        .WhereIf(input.KetQua.HasValue, x => x.KetQua == input.KetQua);
            var tatolCount = await query.CountAsync();
            var result = await query.OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();
            return new PagedResultDto<EmployeeListDto>(tatolCount, ObjectMapper.Map<List<EmployeeListDto>>(result));
        }

        public async Task<CreateEmployeeDto> GetId(int id)
        {
            var dto = await _employeeRepository.FirstOrDefaultAsync(id);
            return ObjectMapper.Map<CreateEmployeeDto>(dto);
 
        }

        public async Task Update(CreateEmployeeDto input)
        {
            var emp = await _employeeRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
            if (input.CVName != null && input.IsSeletedFile)
            {
                //Delete old document file
                AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.AttachmentsFolder, input.CVName);
                var sourceFile = Path.Combine(_appFolders.TempFileUploadFolder, input.CVName);
                var destFile = Path.Combine(_appFolders.AttachmentsFolder, input.CVName);
                System.IO.File.Move(sourceFile, destFile);
                var filePath = Path.Combine(_appFolders.AttachmentsFolder, input.CVName);
                emp.CVName = input.CVName;
                emp.CVUrl = input.CVUrl;
            }
            emp.BangCap = input.BangCap;
            emp.ChoOHienTai = input.ChoOHienTai;
            emp.ContentType = input.ContentType;
            emp.CtyNhan = input.CtyNhan;
            emp.DanhGiaNgonNgu = input.DanhGiaNgonNgu;
            emp.Email = input.Email;
            emp.FaceBook = input.FaceBook;
            emp.GioiTinh = input.GioiTinh;
            emp.HoTen = input.HoTen;
            emp.Id = input.Id;
            emp.KetQua = input.KetQua;
            emp.KinhNghiem = input.KinhNghiem;
            emp.LuongMongMuon = input.LuongMongMuon;
            emp.NamSinh = input.NamSinh;
            emp.NamTotNghiep = input.NamTotNghiep;
            emp.Nganh = input.Nganh;
            emp.NgayHoTro = input.NgayHoTro;
            emp.NgayNhanCV = input.NgayNhanCV;
            emp.NgonNgu = input.NgonNgu;
            emp.NguyenVong = input.NguyenVong;
            emp.NoiDung = input.NoiDung;
            emp.QueQuan = input.NoiDung;
            emp.SDT = input.SDT;
            emp.TrangThai = input.TrangThai;
            emp.TenantId = (int)input.TenantId;
            await _employeeRepository.UpdateAsync(emp);
        }

        public FileDto DownloadTempAttachment(int id)
        {
            var file = _employeeRepository.Get(id);

            if (file != null && !string.IsNullOrEmpty(file.CVUrl) && File.Exists(file.CVUrl))
            {
                var zipFileDto = new FileDto(file.CVName, file.ContentType);

                var outputZipFilePath = Path.Combine(_appFolders.TempFileDownloadFolder, zipFileDto.FileToken);

                File.Copy(file.CVUrl, outputZipFilePath, true);

                return zipFileDto;
            }
            return null;
        }

        public void DeleteDocumentTempFile(string DocumentName)
        {
            AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TempFileUploadFolder, DocumentName);
        }

        public async Task DaNhan(int id)
        {
            var emp = await _employeeRepository.FirstOrDefaultAsync(id);
            emp.KetQua = true;
        }

        public async Task HuyNhan(int id)
        {
            var emp = await _employeeRepository.FirstOrDefaultAsync(id);
            emp.KetQua = false;
        }

        public async Task ChuyenVeQLCV(int id)
        {
            var emp = await _employeeRepository.FirstOrDefaultAsync(id);
            emp.KetQua = false;
            emp.TrangThai = false;
            emp.NgayHoTro = null;
            emp.CtyNhan = null;
        }

        public async Task GuiCV(int id, string tencty)
        {
            var emp = await _employeeRepository.FirstOrDefaultAsync(id);
            emp.TrangThai = true;
            emp.CtyNhan = tencty;
            emp.NgayHoTro = DateTime.Now;
        }

        public async Task<FileDto> GetCVToExcel(EmployeeInputDto input)
        {
            var list = await GetAll(input);
            var dto = list.Items.ToList();
            return _employeeListExcelExporter.Export(dto);
        }

        public async Task<FileDto> GetGuiCVToExcel(EmployeeGuiInputDto inputDto)
        {
            var list = await GetAll_Gui(inputDto);
            var dto = list.Items.ToList();
            return _employeeListExcelExporter.Export_CVNhan(dto);
        }
    }
}
