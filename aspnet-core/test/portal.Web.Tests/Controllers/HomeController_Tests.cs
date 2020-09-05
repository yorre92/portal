using System.Threading.Tasks;
using portal.Models.TokenAuth;
using portal.Web.Controllers;
using Shouldly;
using Xunit;

namespace portal.Web.Tests.Controllers
{
    public class HomeController_Tests: portalWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}