using AutoMapper;
using ManagerCV.Employee.Dto;
using ManagerCV.Language.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerCV
{
   internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Models.Employee, EmployeeListDto>().ReverseMap();
            configuration.CreateMap<Models.Employee, CreateEmployeeDto>().ReverseMap();
            configuration.CreateMap<Models.CtgLanguage, LanguageDto>().ReverseMap();

        }
    }
}
