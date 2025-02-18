using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows
{
  public class WorkflowStep : Entity
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public string Type { get; set; }

    public string Request { get; set; }

    public int WorkflowId { get; set; }
  }
}
