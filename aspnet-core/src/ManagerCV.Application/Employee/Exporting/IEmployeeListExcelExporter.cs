using ManagerCV.Employee.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ManagerCV.Employee.Exporting
{
    public interface IEmployeeListExcelExporter
    {
       FileDto Export(List<EmployeeListDto> list);

        FileDto Export_CVNhan(List<EmployeeListDto> list);
    }
}
