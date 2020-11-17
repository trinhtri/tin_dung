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

namespace ManagerCV.Company
{
   public class CompanyAppService:ManagerCVAppServiceBase,ICompanyAppService
    {
		private readonly IRepository<Models.Company> _ctgCompanyRepository;
		public CompanyAppService(IRepository<Models.Company> ctyCompanyRepository)
		{
			_ctgCompanyRepository = ctyCompanyRepository;
		}
		public async Task<int> Create(CreateCompanyDto input)
		{
			input.TenantId = AbpSession.TenantId ?? 1;
			var company = ObjectMapper.Map<Models.Company>(input);
			await _ctgCompanyRepository.InsertAsync(company);
			await CurrentUnitOfWork.SaveChangesAsync();
			return company.Id;
		}

		public async Task Delete(int id)
		{
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
			var languge = await _ctgCompanyRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
			ObjectMapper.Map(input, languge);
		}
	}
}
