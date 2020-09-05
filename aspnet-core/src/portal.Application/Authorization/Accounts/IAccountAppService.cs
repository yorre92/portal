using System.Threading.Tasks;
using Abp.Application.Services;
using portal.Authorization.Accounts.Dto;

namespace portal.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
