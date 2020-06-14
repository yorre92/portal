import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.css'],
})
export class FormDesignerComponent implements OnInit {
  form: FormGroup;

  activeElement;
  activeIndex;
  elements = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterName: '',
      header: '',
      type: '',
      regex: '',
      regexMessage: '',
      isMandatory: false,
      isDisabled: false,
      isVisible: false,
      width: 'box-four',
    });

    this.form.valueChanges.subscribe(
      (res) => (this.elements[this.activeIndex] = res)
    );
  }

  add() {
    if (this.form.invalid) {
      return;
    }

    this.elements.push({
      parameterName: '',
      header: '',
      type: '',
      regex: '',
      regexMessage: '',
      isMandatory: false,
      isDisabled: false,
      isVisible: false,
      width: 'box-four',
    });

    this.activeIndex = this.elements.length - 1;
    this.form.patchValue(this.elements[this.activeIndex]);
  }

  select(i) {
    this.activeIndex = i;
    this.form.patchValue(this.elements[this.activeIndex]);
  }
}
