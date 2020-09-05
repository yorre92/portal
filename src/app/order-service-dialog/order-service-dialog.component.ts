import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from '../service-list/service-list.component';

@Component({
  selector: 'app-order-service-dialog',
  templateUrl: './order-service-dialog.component.html',
  styleUrls: ['./order-service-dialog.component.css'],
})
export class OrderServiceDialogComponent implements OnInit {
  service: Service;
  elements: any[];
  state: string;

  constructor(
    public dialogRef: MatDialogRef<OrderServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.service = data.service;

    if (this.service.elements) {
      this.elements = JSON.parse(this.service.elements);
    }
  }

  ngOnInit(): void {}

  updateFormState(state: string) {
    this.state = state;
  }

  send() {
    const input = this.elements.map((x) => {
      return { name: x.parameterName, value: x.value };
    });

    this.dialogRef.close(input);
  }
}
