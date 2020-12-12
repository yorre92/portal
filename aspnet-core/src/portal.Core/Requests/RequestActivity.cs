using Abp.BackgroundJobs;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Events.Bus.Entities;
using Abp.Events.Bus.Handlers;
using portal.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Requests
{
  public class RequestActivity : IEventHandler<EntityCreatedEventData<Request>>, ITransientDependency
  {
    private readonly IBackgroundJobManager _backgroundJobManager;
    public RequestActivity(IBackgroundJobManager backgroundJobManager)
    {
      _backgroundJobManager = backgroundJobManager;
    }

    public void HandleEvent(EntityCreatedEventData<Request> eventData)
    {
      _backgroundJobManager.Enqueue<RequestExecuteJob, int>(eventData.Entity.Id);
    }
  }
}
