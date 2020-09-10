using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders.Dto
{
  [AutoMap(typeof(OrderInput))]
  public class OrderInputDto
  {
    public string Name { get; set; }

    public string Value { get; set; }
  }
}
