using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using portal.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders
{
  public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
  {
    public OrderAppService(IRepository<Order> repository) : base(repository)
    {

    }

    protected override OrderDto MapToEntityDto(Order entity)
    {
      Repository.EnsureCollectionLoaded(entity, x => x.Input);

      return base.MapToEntityDto(entity);
    }
  }
}
