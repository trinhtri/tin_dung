﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.Language.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ManagerCV.Language
{
   public interface ILanguageAppService: IApplicationService
	{
        Task<PagedResultDto<LanguageDto>> GetAll(GetLangugeInputDto input);
        Task<long> Create(LanguageDto input);
        [HttpPost]
        Task Update(LanguageDto input);
        Task<LanguageDto> GetId(int Id);
        [HttpDelete]
        Task Delete(int id);
    }
}
