using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace portal.Services.Dto
{
  [AutoMap(typeof(Service))]
  public class ServiceDto : EntityDto<int>
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
