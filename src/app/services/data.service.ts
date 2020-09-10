import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Service } from '../service-list/service-list.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  listServices(skipCount, maxResultCount) {
    let params = new HttpParams();
    params = params.append('SkipCount', skipCount);
    params = params.append('maxResultCount', maxResultCount);

    return this.http
      .get(`${this.baseUrl}/api/services/app/Service/GetAll`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result as PagedResult;
        })
      );
  }

  getService(id) {
    let params = new HttpParams();
    params = params.append('Id', id);

    return this.http
      .get(`${this.baseUrl}/api/services/app/Service/Get`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  createService(service: Service) {
    return this.http
      .post(`${this.baseUrl}/api/services/app/Service/Create`, service)
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  updateService(service: Service) {
    return this.http
      .put(`${this.baseUrl}/api/services/app/Service/Update`, service)
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  deleteService(id) {
    let params = new HttpParams();
    params = params.append('Id', id);

    return this.http
      .delete(`${this.baseUrl}/api/services/app/Service/Delete`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  listWorkflows(skipCount, maxResultCount) {
    let params = new HttpParams();
    params = params.append('SkipCount', skipCount);
    params = params.append('maxResultCount', maxResultCount);

    return this.http
      .get(`${this.baseUrl}/api/services/app/Workflow/GetAll`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result as PagedResult;
        })
      );
  }

  getWorkflow(id) {
    let params = new HttpParams();
    params = params.append('Id', id);

    return this.http
      .get(`${this.baseUrl}/api/services/app/Workflow/Get`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  createWorkflow(workflow) {
    return this.http
      .post(`${this.baseUrl}/api/services/app/Workflow/Create`, workflow)
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  updateWorkflow(workflow) {
    return this.http
      .put(`${this.baseUrl}/api/services/app/Workflow/Update`, workflow)
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  deleteWorkflow(id) {
    let params = new HttpParams();
    params = params.append('Id', id);

    return this.http
      .delete(`${this.baseUrl}/api/services/app/Workflow/Delete`, {
        params: params,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  getMenu() {
    return this.http
      .get(`${this.baseUrl}/api/services/app/Configuration/GetMenu`)
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }

  setMenu(menu) {
    return this.http
      .put(`${this.baseUrl}/api/services/app/Configuration/UpdateMenu`, {
        menu: menu,
      })
      .pipe(
        map((res: SingleResult) => {
          return res.result;
        })
      );
  }
}

export interface PagedResult {
  totalCount: number;
  items: any[];
}

export interface SingleResult {
  result: any;
}
