using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders.Dto
{
  [AutoMap(typeof(Order))]
  public class OrderDto : EntityDto<int>
  {
    public DateTime CreationTime { get; set; }

    public int ServiceId { get; set; }
    public IEnumerable<OrderInputDto> Input { get; set; }
  }
}
