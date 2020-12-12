using Abp.Dependency;
using portal.Orders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace portal.Workflows
{
  public interface IWorkflowExecutor : ITransientDependency
  {
    Task RunWorkflow(int requestId);
  }
}
