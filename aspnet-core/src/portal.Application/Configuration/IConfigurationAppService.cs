using System.Threading.Tasks;
using portal.Configuration.Dto;

namespace portal.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
