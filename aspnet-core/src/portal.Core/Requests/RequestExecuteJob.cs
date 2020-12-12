using Abp.BackgroundJobs;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Newtonsoft.Json;
using portal.Orders;
using portal.Services;
using portal.Workflows;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Requests
{
  public class RequestExecuteJob : BackgroundJob<int>, ITransientDependency
  {
    private readonly IRepository<Request> _requestRepository;
    private readonly IWorkflowExecutor _workflowExecutor;

    public RequestExecuteJob(IRepository<Request> requestRepository, IWorkflowExecutor workflowExecutor)
    {
      _requestRepository = requestRepository;
      _workflowExecutor = workflowExecutor;
    }

    [UnitOfWork]
    public override void Execute(int requestId)
    {
      _workflowExecutor.RunWorkflow(requestId);
    }
  }
}
