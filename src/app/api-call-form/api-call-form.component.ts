import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {
  HttpClient,
  HttpRequest,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-api-call-form',
  templateUrl: './api-call-form.component.html',
  styleUrls: ['./api-call-form.component.css'],
})
export class ApiCallFormComponent implements OnInit {
  methodTypes = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'];
  result;
  @Input('form') form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   url: '',
    //   headers: this.fb.array([]),
    //   params: this.fb.array([]),
    //   body: '',
    //   method: '',
    // });

    console.log(this.form);

    this.addParam();
    this.addHeader();
  }

  get params() {
    return this.form.get('params') as FormArray;
  }

  get headers() {
    return this.form.get('headers') as FormArray;
  }

  addHeader() {
    const header = this.fb.group({
      name: '',
      value: '',
    });

    this.headers.push(header);
  }

  deleteHeader(i) {
    this.headers.removeAt(i);
  }

  addParam() {
    const param = this.fb.group({
      name: '',
      value: '',
    });

    this.params.push(param);
  }

  deleteParam(i) {
    this.params.removeAt(i);
  }

  test() {
    let params = new HttpParams();
    this.params.value.forEach((param) => {
      if (param.value && param.name)
        params = params.append(param.name, param.value);
    });

    let headers = new HttpHeaders();
    this.headers.value.forEach((header) => {
      if (header.value && header.name)
        headers = headers.set(header.name, header.value);
    });

    let request = new HttpRequest(
      this.form.get('method').value,
      this.form.get('url').value,
      this.form.get('body').value
        ? JSON.parse(this.form.get('body').value)
        : null,
      { params: params, headers }
    );

    this.http.request(request).subscribe((res: any) => {
      this.result = res.body;
    });
  }
}

export interface NameValue {
  name: '';
  value: '';
}
