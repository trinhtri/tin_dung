using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using ManagerCV.Company.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using ManagerCV.IO;
using System.IO;

namespace ManagerCV.Company
{
   public class CompanyAppService:ManagerCVAppServiceBase,ICompanyAppService
    {
		private readonly IRepository<Models.Company> _ctgCompanyRepository;
		private IAppFolders _appFolders;
		public CompanyAppService(IRepository<Models.Company> ctyCompanyRepository, IAppFolders appFolders)
		{
			_ctgCompanyRepository = ctyCompanyRepository;
			_appFolders = appFolders;
		}
		public async Task<int> Create(CreateCompanyDto input)
		{
			input.TenantId = AbpSession.TenantId ?? 1;
			var company = ObjectMapper.Map<Models.Company>(input);
			if (company.HopDong != null)
			{
				AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TemFileHopDongFolder, input.HopDong);
				var sourceFile = Path.Combine(_appFolders.AttachHopDongFolder, input.HopDong);
				var destFile = Path.Combine(_appFolders.TemFileHopDongFolder, input.HopDong);
				System.IO.File.Move(sourceFile, destFile);
				var filePath = Path.Combine(_appFolders.TemFileHopDongFolder, input.HopDong);
				company.UrlHopDong = filePath;
			}
			if (input.ThanhToan != null)
			{
				AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				var sourceFile = Path.Combine(_appFolders.AttachThanhToanFolder, input.ThanhToan);
				var destFile = Path.Combine(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				System.IO.File.Move(sourceFile, destFile);
				var filePath = Path.Combine(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				company.UrlThanhToan = filePath;
			}
			await _ctgCompanyRepository.InsertAsync(company);
			await CurrentUnitOfWork.SaveChangesAsync();
			return company.Id;
		}

		public async Task Delete(int id)
		{
			var company = await _ctgCompanyRepository.FirstOrDefaultAsync(id);
			if (System.IO.File.Exists(company.UrlThanhToan))
			{
				System.IO.File.Delete(company.UrlThanhToan);
			}
			if (System.IO.File.Exists(company.UrlHopDong))
			{
				System.IO.File.Delete(company.UrlHopDong);
			}
			await _ctgCompanyRepository.DeleteAsync(id);

		}

		public async Task<PagedResultDto<CompanyListDto>> GetAll(GetCompanyInputDto input)
		{
			if (!input.Filter.IsNullOrEmpty())
			{
				input.Filter = Regex.Replace(input.Filter.Trim(), @"\s+", " ");
			}
			var query = _ctgCompanyRepository.GetAll()
						.WhereIf(!input.Filter.IsNullOrEmpty(),
						 x => x.TenCTy.ToUpper().Contains(input.Filter.ToUpper())
						 || x.Email.ToUpper().Contains(input.Filter.ToUpper())
						 || x.SDT.ToUpper().Contains(input.Filter.ToUpper())
						 );
            var tatolCount = await query.CountAsync();
			var result = await query.OrderBy(input.Sorting)
				.PageBy(input)
				.ToListAsync();
			return new PagedResultDto<CompanyListDto>(tatolCount, ObjectMapper.Map<List<CompanyListDto>>(result));
		}

		public async Task<CreateCompanyDto> GetId(int Id)
		{
			var input = await _ctgCompanyRepository.FirstOrDefaultAsync(Id);
			var result = ObjectMapper.Map<CreateCompanyDto>(input);
			return result;
		}

		public async Task Update(CreateCompanyDto input)
		{
			var company = await _ctgCompanyRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
			ObjectMapper.Map(input, company);
			if (input.HopDong != null && input.IsSelectHD)
			{
				AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TemFileHopDongFolder, input.HopDong);
				var sourceFile = Path.Combine(_appFolders.AttachHopDongFolder, input.HopDong);
				var destFile = Path.Combine(_appFolders.TemFileHopDongFolder, input.HopDong);
				System.IO.File.Move(sourceFile, destFile);
				var filePath = Path.Combine(_appFolders.TemFileHopDongFolder, input.HopDong);
				company.UrlHopDong = filePath;
			}	
			if (input.ThanhToan != null && input.IsSelectTT)
			{
				AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				var sourceFile = Path.Combine(_appFolders.AttachThanhToanFolder, input.ThanhToan);
				var destFile = Path.Combine(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				System.IO.File.Move(sourceFile, destFile);
				var filePath = Path.Combine(_appFolders.TemFileThanhToanFolder, input.ThanhToan);
				company.UrlThanhToan = filePath;
			}
		}

		public FileDto DownloadHD(int id)
		{
			var file = _ctgCompanyRepository.Get(id);

			if (file != null && !string.IsNullOrEmpty(file.UrlHopDong) && File.Exists(file.UrlHopDong))
			{
				var zipFileDto = new FileDto(file.HopDong, file.ContentTypeHD);

				var outputZipFilePath = Path.Combine(_appFolders.TemFileHopDongFolder, zipFileDto.FileToken);

				File.Copy(file.UrlHopDong, outputZipFilePath, true);

				return zipFileDto;
			}
			return null;
		}
		public FileDto DownloadTT(int id)
		{
			var file = _ctgCompanyRepository.Get(id);

			if (file != null && !string.IsNullOrEmpty(file.UrlThanhToan) && File.Exists(file.UrlThanhToan))
			{
				var zipFileDto = new FileDto(file.ThanhToan, file.ContentTypeTT);

				var outputZipFilePath = Path.Combine(_appFolders.TemFileThanhToanFolder, zipFileDto.FileToken);

				File.Copy(file.UrlThanhToan, outputZipFilePath, true);

				return zipFileDto;
			}
			return null;
		}
	}
}
