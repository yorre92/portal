using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using portal.Workflows.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Workflows
{
  public class WorkflowAppService : AsyncCrudAppService<Workflow, WorkflowDto, int, PagedResultRequestDto, CreateWorkflowDto, WorkflowDto>, IWorkflowAppService
  {
    public WorkflowAppService(IRepository<Workflow> repository) : base(repository)
    {

    }

    protected override WorkflowDto MapToEntityDto(Workflow entity)
    {
      Repository.EnsureCollectionLoaded(entity, x => x.Steps);

      return base.MapToEntityDto(entity);
    }
  }
}
