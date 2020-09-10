using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows.Dto
{
  [AutoMap(typeof(Workflow))]
  public class CreateWorkflowDto
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public IEnumerable<WorkflowStepDto> Steps { get; set; }
  }
}
