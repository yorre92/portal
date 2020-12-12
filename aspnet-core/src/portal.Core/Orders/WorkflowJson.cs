using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Orders
{
  public class WorkflowJson
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public List<WorkflowStepJson> Steps { get; set; }
  }

  public class WorkflowStepJson
  {
    public string Name { get; set; }

    public string Description { get; set; }

    public string Type { get; set; }

    public string Request { get; set; }

    public string Error { get; set; }
  }

  public class WorkflowRequestStep
  {
    public string Method { get; set; }

    public NameValue[] Params { get; set; }

    public NameValue[] Headers { get; set; }

    public string Url { get; set; }

    public string Body { get; set; }

    public string ResultVariable { get; set; }
  }

  public class NameValue
  {
    public string Name { get; set; }

    public string Value { get; set; }
  }
}
