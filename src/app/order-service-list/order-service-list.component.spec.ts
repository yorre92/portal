import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceListComponent } from './order-service-list.component';

describe('OrderServiceListComponent', () => {
  let component: OrderServiceListComponent;
  let fixture: ComponentFixture<OrderServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
