using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows
{
  public class Workflow : Entity
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public IEnumerable<WorkflowStep> Steps { get; set; }
  }
}
