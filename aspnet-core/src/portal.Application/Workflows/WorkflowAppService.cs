using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.ObjectMapping;
using portal.Workflows.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace portal.Workflows
{
  public class WorkflowAppService : AsyncCrudAppService<Workflow, WorkflowDto, int, PagedResultRequestDto, CreateWorkflowDto, WorkflowDto>, IWorkflowAppService
  {
    private readonly IRepository<WorkflowStep> _workflowStepsRepository;
    private readonly IObjectMapper _objectMapper;

    public WorkflowAppService(IRepository<Workflow> repository, IRepository<WorkflowStep> workflowStepRepository, IObjectMapper objectMapper) : base(repository)
    {
      _workflowStepsRepository = workflowStepRepository;
      _objectMapper = objectMapper;
    }


    public override async Task<WorkflowDto> UpdateAsync(WorkflowDto input)
    {
      var steps = _workflowStepsRepository.GetAll().Where(x => x.WorkflowId == input.Id);

      foreach (var step in steps)
      {
        _workflowStepsRepository.Delete(step.Id);
      }

      var entity = Repository.Get(input.Id);

      entity.Steps = _objectMapper.Map<IEnumerable<WorkflowStep>>(input.Steps);

      await Repository.UpdateAsync(entity);

      return MapToEntityDto(entity);
    }


    protected override WorkflowDto MapToEntityDto(Workflow entity)
    {
      Repository.EnsureCollectionLoaded(entity, x => x.Steps);

      return base.MapToEntityDto(entity);
    }
  }
}
