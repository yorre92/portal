import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.css'],
})
export class FormDesignerComponent implements OnInit {
  form: FormGroup;

  activeElement;
  activeIndex;
  @Output('formState') formState = new EventEmitter();
  @Output('formValue') formValue = new EventEmitter();
  @Input('elements') elements: any[];

  types = [
    { value: 'input', icon: 'input' },
    { value: 'select', icon: 'view_list' },
    { value: 'checkbox', icon: 'done_outline' },
    { value: 'search', icon: 'search' },
    { value: 'datepicker', icon: 'date_range' },
  ];

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      parameterName: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      regex: '',
      regexMessage: '',
      options: this.fb.group({
        name: '',
        value: '',
      }),
      isMandatory: false,
      isDisabled: false,
      isVisible: false,
      width: 'box-four',
    });

    if (this.elements && this.elements.length > 0) {
      this.select(0);
    }

    this.form.valueChanges.subscribe(
      (res) => (this.elements[this.activeIndex] = res)
    );

    this.form.statusChanges.pipe(debounceTime(200)).subscribe((res) => {
      this.formState.emit(res);

      if (res === 'VALID') {
        this.formValue.emit(this.form.value);
      }
    });
  }

  add() {
    if (!this.elements) this.elements = [];

    if (this.elements.length > 0 && this.form.invalid) {
      this.form.markAllAsTouched();
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
    this.form.markAsUntouched();
  }

  moveUp(i) {
    if (i > 0) {
      let currentElement = this.elements[i];
      let aboveElement = this.elements[i - 1];

      this.elements[i] = aboveElement;
      this.elements[i - 1] = currentElement;
      this.activeIndex = i - 1;
    }
  }

  moveDown(i) {
    if (i < this.elements.length - 1) {
      let currentElement = this.elements[i];
      let aboveElement = this.elements[i + 1];

      this.elements[i] = aboveElement;
      this.elements[i + 1] = currentElement;
      this.activeIndex = i + 1;
    }
  }

  remove(i) {
    this.elements.splice(i, 1);

    if (this.elements.length > 0) {
      this.select(this.elements.length - 1);
    } else {
      this.activeIndex = undefined;
      this.form.reset();
    }
  }

  select(i) {
    this.activeIndex = i;
    this.form.patchValue(this.elements[this.activeIndex]);
  }
}
