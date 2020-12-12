using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Newtonsoft.Json;
using portal.Orders.Dto;
using portal.Requests;
using portal.Services;
using portal.Workflows;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace portal.Orders
{
  public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
  {
    private readonly IRepository<Service> _serviceRepository;
    private readonly IRepository<Workflow> _workflowRepository;
    private readonly IRepository<Request> _requestRepository;

    public OrderAppService(IRepository<Order> repository, IRepository<Service> serviceRepository, IRepository<Workflow> workflowRepository, IRepository<Request> requestRepository) : base(repository)
    {
      _serviceRepository = serviceRepository;
      _workflowRepository = workflowRepository;
      _requestRepository = requestRepository;
    }


    public override async Task<OrderDto> CreateAsync(CreateOrderDto input)
    {
      var service = await _serviceRepository.GetAsync(input.ServiceId);
      var workflow = _workflowRepository.Get(service.WorkflowId);
      await _workflowRepository.EnsureCollectionLoadedAsync(workflow, x => x.Steps);

      var res = await base.CreateAsync(input);

      if (workflow.Steps != null)
      {
        await _requestRepository.InsertAsync(new Request()
        {
          OrderId = res.Id,
          Step = 0,
          WorkflowJson = JsonConvert.SerializeObject(workflow)
        });
      }

      return res;
    }

    protected override OrderDto MapToEntityDto(Order entity)
    {
      Repository.EnsureCollectionLoaded(entity, x => x.Input);

      return base.MapToEntityDto(entity);
    }
  }
}
