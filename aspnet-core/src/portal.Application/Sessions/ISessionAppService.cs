using System.Threading.Tasks;
using Abp.Application.Services;
using portal.Sessions.Dto;

namespace portal.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
