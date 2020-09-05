using Abp.Domain.Entities;
using portal.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders
{
  public class OrderInput : Entity
  {
    public string Name { get; set; }

    public string Value { get; set; }

    public int OrderId { get; set; }
  }
}
