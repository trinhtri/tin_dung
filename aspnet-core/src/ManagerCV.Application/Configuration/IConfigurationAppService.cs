using System.Threading.Tasks;
using ManagerCV.Configuration.Dto;

namespace ManagerCV.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
