using Abp.Application.Services;
using Abp.Application.Services.Dto;
using portal.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Services
{
  public interface IServiceAppService : IAsyncCrudAppService<ServiceDto, int, PagedResultRequestDto, CreateServiceDto, ServiceDto>
  {
  }
}
