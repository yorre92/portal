using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Extensions;
using Abp.Runtime.Session;
using Abp.UI;
using Newtonsoft.Json;
using portal.Configuration.Dto;

namespace portal.Configuration
{
  [AbpAuthorize]
  public class ConfigurationAppService : portalAppServiceBase, IConfigurationAppService
  {
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
      await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }

    public async Task<MenuDto> GetMenu()
    {
      var menu = await SettingManager.GetSettingValueAsync("Menu");

      if (menu.IsNullOrWhiteSpace())
      {
        throw new UserFriendlyException("No menu found");
      }

      return new MenuDto() { Menu = JsonConvert.DeserializeObject(menu) };
    }

    public async Task UpdateMenu(MenuDto menu)
    {
      await SettingManager.ChangeSettingForTenantAsync(AbpSession.TenantId.Value, "Menu", JsonConvert.SerializeObject(menu.Menu));
    }
  }
}
