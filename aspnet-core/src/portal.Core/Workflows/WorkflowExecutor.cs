using Abp.Domain.Repositories;
using Abp.Extensions;
using Newtonsoft.Json;
using portal.Orders;
using portal.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace portal.Workflows
{
  public class WorkflowExecutor : IWorkflowExecutor
  {
    private readonly IRepository<Request> _requestRepository;
    private readonly IRepository<RequestInput> _requestInputRepository;
    private readonly IRepository<Order> _orderRepository;
    private Dictionary<string, dynamic> resultVariables;

    public WorkflowExecutor(IRepository<Request> requestRepository, IRepository<Order> orderRepository, IRepository<RequestInput> requestInputRepository)
    {
      _requestRepository = requestRepository;
      _orderRepository = orderRepository;
      _requestInputRepository = requestInputRepository;
      resultVariables = new Dictionary<string, dynamic>();
    }

    public async Task RunWorkflow(int requestId)
    {
      var request = await _requestRepository.GetAsync(requestId);
      var order = await _orderRepository.GetAsync(request.OrderId);
      var workflow = JsonConvert.DeserializeObject<WorkflowJson>(request.WorkflowJson);

      foreach (var step in workflow.Steps)
      {
        WorkflowRequestStep httprequest = null;

        if (step.Type == "httprequest")
        {
          httprequest = ParseRequest(step.Request);

          httprequest.Url = ReplaceVariableNames(httprequest.Url);


          try
          {
            var result = await GetRequestResult(httprequest);

            resultVariables.Add(httprequest.ResultVariable, JsonConvert.DeserializeObject<dynamic>(result));
          }
          catch (Exception e)
          {
            step.Error = e.Message;

            break;
          }
        }

        await UpdateRequest(request, workflow);
      }
    }

    private string GetVariableValue(string variableName, dynamic obj)
    {
      var variables = variableName.Split('.');

      foreach (var variable in variables)
      {
        var type = obj.GetType();

        if (type.Name == "JArray" && variable.IndexOf('[') != -1)
        {
          var bracketIndex = variable.IndexOf('[');
          var closedBracketIndex = variable.IndexOf(']');

          string number = variable.Substring(bracketIndex + 1, closedBracketIndex - 1);

          obj = obj[Convert.ToInt32(number)];
        }
        else
        {
          obj = obj[variable];
        }
      }

      return JsonConvert.SerializeObject(obj);
    }

    //private Dictionary<string, string> GetAllNestedVariables(dynamic obj, Dictionary<string, string> list, string variableName)
    //{
    //  var type = obj.GetType();

    //  if (type.Name == "JArray")
    //  {
    //    foreach (var row in obj as IEnumerable<object>)
    //    {
    //      var rowType = row.GetType();

    //      if (rowType.Name == "JArray" || rowType.Name == "JObject")
    //      {
    //        GetAllNestedVariables(row, list, variableName);
    //      }
    //      else
    //      {
    //        list.Add($"{variableName}.{row.ToString()}", row.ToString());
    //      }
    //    }
    //  }

    //  if (type.Name == "JObject")
    //  {
    //    foreach (var property in type.GetProperties())
    //    {

    //      var value = property.GetValue(obj, null);

    //      GetAllNestedVariables(value, list, variableName);
    //    }
    //  }

    //  return list;
    //}

    private string ReplaceVariableNames(string content)
    {
      if (content.Contains("${"))
      {
        var startIndex = content.IndexOf("${");

        var contentArray = content.ToArray();

        var sb = new StringBuilder();
        bool addChars = true;

        for (int i = 0; i < contentArray.Length; i++)
        {
          if (contentArray[i] == '$' && contentArray[i + 1] == '{')
          {
            i = i + 1;
            sb = new StringBuilder();
            addChars = true;
            continue;
          }

          if (contentArray[i] == '}')
          {
            addChars = false;
            break;
          }

          if (addChars)
          {
            sb = sb.Append(contentArray[i].ToString());
          }
        }

        var variableText = "${" + sb.ToString() + "}";

        //if (resultVariables.FirstOrDefault(x => x.Key.Equals(sb.ToString().Split('.')[0], StringComparison.InvariantCultureIgnoreCase)){
        //  return content;
        //}

        //var variableName = sb.ToString().Split('.').Skip(1)

        content = content.Replace(variableText, GetVariableValue(sb.ToString(), resultVariables.FirstOrDefault(x => x.Key == sb.ToString().Split('.')[0]).Value));
      }

      return content;
    }

    private async Task UpdateRequest(Request request, WorkflowJson workflow)
    {
      await _requestInputRepository.DeleteAsync(x => x.RequestId == request.Id);
      request.WorkflowJson = JsonConvert.SerializeObject(workflow);
      await _requestRepository.UpdateAsync(request);

      foreach (var variable in resultVariables)
      {
        await _requestInputRepository.InsertAsync(new RequestInput()
        {
          Name = variable.Key,
          Value = JsonConvert.SerializeObject(variable.Value),
          RequestId = request.Id
        });
      }
    }

    private WorkflowRequestStep ParseRequest(string request)
    {
      return JsonConvert.DeserializeObject<WorkflowRequestStep>(request);
    }

    private async Task<string> GetRequestResult(WorkflowRequestStep request)
    {
      var http = new HttpClient();

      foreach (var header in request.Headers)
      {
        http.DefaultRequestHeaders.Add(header.Name, header.Value);
      }

      var list = new List<string>();
      foreach (var param in request.Params)
      {
        list.Add($"{param.Name}={param.Value}");
      }

      var queryParameterString = "?" + string.Join('&', list);

      queryParameterString = queryParameterString != "?" ? queryParameterString : "";

      StringContent content = null;

      if (request.Body.IsNullOrWhiteSpace())
      {
        var body = JsonConvert.DeserializeObject(request.Body);
        content = new StringContent(JsonConvert.SerializeObject(body), Encoding.Default, "application/json");
      }

      HttpResponseMessage result = null;

      switch (request.Method)
      {
        case "POST":
          result = await http.PostAsync(request.Url + queryParameterString, content);
          break;

        case "GET":
          result = await http.GetAsync(request.Url + queryParameterString);
          break;

        case "PUT":
          result = await http.PutAsync(request.Url + queryParameterString, content);
          break;

        case "DELETE":
          result = await http.DeleteAsync(request.Url + queryParameterString);
          break;

        default:
          break;
      }

      if (!result.IsSuccessStatusCode)
      {
        throw new Exception("Error: " + result.ReasonPhrase + ". Status Code: " + result.StatusCode);
      }

      return await result.Content.ReadAsStringAsync();
    }
  }
}
