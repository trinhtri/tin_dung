using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.ConfigToSendMail.Dto;
using System.Threading.Tasks;

namespace ManagerCV.ConfigToSendMail
{
   public interface IConfigToSendMailAppService: IApplicationService
    {
        Task<PagedResultDto<GetConfigToSendMailListDto>> GetAll(GetConfigToSendMailInput input);
        Task<long> Create(CreateConfigToSendMailDto input);
        Task Update(CreateConfigToSendMailDto input);
        Task Delete(int id);
        Task<CreateConfigToSendMailDto> GetId(int id);

        Task<FileDto> GetConfigToSendMailToExcel(GetConfigToSendMailInput input);

        Task SendMail(CreateConfigToSendMailDto input);
        Task<CreateConfigToSendMailDto> GetEmailActive();

    }
}
