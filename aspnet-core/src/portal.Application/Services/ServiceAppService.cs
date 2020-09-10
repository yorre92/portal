using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using portal.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Services
{
  public class ServiceAppService : AsyncCrudAppService<Service, ServiceDto, int, PagedResultRequestDto, CreateServiceDto, ServiceDto>, IServiceAppService
  {
    public ServiceAppService(IRepository<Service> repository) : base(repository)
    {

    }
  }
}
