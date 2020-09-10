using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows.Dto
{
  [AutoMap(typeof(WorkflowStep))]

  public class WorkflowStepDto
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public string Type { get; set; }

    public string Request { get; set; }
  }
}
