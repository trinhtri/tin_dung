using AutoMapper;
using ManagerCV.Company.Dto;
using ManagerCV.Employee.Dto;
using ManagerCV.Language.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ManagerCV
{
   internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<Models.Employee, EmployeeListDto>()
                //.ForMember(ldto => ldto.NhungNgonNgu, options => options.MapFrom(l => l.EmployeeLanguages.Aggregate((a, b) => a.CtgLanguage_.NgonNgu.ToString() + ", " + b.CtgLanguage_.NgonNgu.ToString())))
                .ReverseMap();
            configuration.CreateMap<Models.Employee, CreateEmployeeDto>().ReverseMap();
            configuration.CreateMap<Models.CtgLanguage, LanguageDto>().ReverseMap();
            configuration.CreateMap<Models.Company, CreateCompanyDto>().ReverseMap();
            configuration.CreateMap<Models.Company, CompanyListDto  >().ReverseMap();

        }
    }
}
