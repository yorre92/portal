using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Requests
{
  public class RequestInput : Entity
  {
    public string Name { get; set; }

    public string Value { get; set; }

    public int RequestId { get; set; }
  }
}
