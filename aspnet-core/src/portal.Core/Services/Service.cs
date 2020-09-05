using Abp.Domain.Entities;
using portal.ServiceInputs;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Services
{
  public class Service : Entity
  {
    public float Cost { get; set; }

    public string Currency { get; set; }

    public string Description { get; set; }

    public string Elements { get; set; }

    public bool HasManagerApproval { get; set; }

    public bool HasSystemApproval { get; set; }

    public string Name { get; set; }

    public string Thumbnail { get; set; }

    public int WorkflowId { get; set; }

  }
}
