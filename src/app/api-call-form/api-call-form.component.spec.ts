import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallFormComponent } from './api-call-form.component';

describe('ApiCallFormComponent', () => {
  let component: ApiCallFormComponent;
  let fixture: ComponentFixture<ApiCallFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCallFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
