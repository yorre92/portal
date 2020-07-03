import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceFormComponent } from './order-service-form.component';

describe('OrderServiceFormComponent', () => {
  let component: OrderServiceFormComponent;
  let fixture: ComponentFixture<OrderServiceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderServiceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
