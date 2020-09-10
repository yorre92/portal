using Abp.Application.Services;
using Abp.Application.Services.Dto;
using portal.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders
{
  public interface IOrderAppService : IAsyncCrudAppService<OrderDto, int, PagedResultRequestDto, CreateOrderDto, OrderDto>
  {
  }
}
