using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using portal.MultiTenancy;

namespace portal.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}
