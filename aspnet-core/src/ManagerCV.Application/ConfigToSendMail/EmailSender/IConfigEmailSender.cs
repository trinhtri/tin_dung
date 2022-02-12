using Abp.Application.Services;
using ManagerCV.ConfigToSendMail.Dto;
using System.Threading.Tasks;

namespace ManagerCV.ConfigToSendMail.EmailSender
{
    public interface IConfigEmailSender: IApplicationService
    {
        Task Contact(CreateConfigToSendMailDto input);
        Task SendJDForCustomer(SenJDForCustomerDto input);
    }
}
