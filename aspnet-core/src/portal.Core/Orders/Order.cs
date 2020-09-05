using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders
{
  public class Order : Entity, IHasCreationTime
  {
    public DateTime CreationTime { get; set; }

    public int ServiceId { get; set; }

    public IEnumerable<OrderInput> Input { get; set; }
  }
}
