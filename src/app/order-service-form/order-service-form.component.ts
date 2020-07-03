import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-service-form',
  templateUrl: './order-service-form.component.html',
  styleUrls: ['./order-service-form.component.css'],
})
export class OrderServiceFormComponent implements OnInit, AfterViewInit {
  @Input('elements') elements: any[];
  @ViewChild('form') form: NgForm;
  @Output('formState') formState = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.form.statusChanges.subscribe((res) => {
      this.formState.emit(res);
    });
  }
}
