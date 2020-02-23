using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ManagerCV.Roles.Dto;
using ManagerCV.Users.Dto;

namespace ManagerCV.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedUserResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
