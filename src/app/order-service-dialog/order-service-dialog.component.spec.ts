import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServiceDialogComponent } from './order-service-dialog.component';

describe('OrderServiceDialogComponent', () => {
  let component: OrderServiceDialogComponent;
  let fixture: ComponentFixture<OrderServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
