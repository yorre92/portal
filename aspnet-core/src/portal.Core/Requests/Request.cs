using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Requests
{
  public class Request : Entity
  {
    public int OrderId { get; set; }
    public string WorkflowJson { get; set; }
    public int Step { get; set; }
    public IEnumerable<RequestInput> Input { get; set; }
  }
}
