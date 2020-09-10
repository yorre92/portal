using Abp.Application.Services;
using Abp.Application.Services.Dto;
using portal.Workflows.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows
{
  public interface IWorkflowAppService : IAsyncCrudAppService<WorkflowDto, int, PagedResultRequestDto, CreateWorkflowDto, WorkflowDto>
  {
  }
}
