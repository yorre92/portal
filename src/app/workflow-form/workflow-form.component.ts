import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { easeIn, slideFromBottom } from '../animations/animations';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./workflow-form.component.css'],
})
export class WorkflowFormComponent implements OnInit {
  @Input('form') form: FormGroup;

  stepTypes = [
    { name: 'Notification', value: 'notification' },
    { name: 'Http Request', value: 'httprequest' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      description: '',
      steps: this.fb.array([]),
    });

    this.addStep();
    this.addStep();
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  addStep() {
    const step = this.fb.group({
      type: '',
      request: this.fb.group({
        url: '',
        headers: this.fb.array([]),
        params: this.fb.array([]),
        body: '',
        method: '',
        resultVariable: '',
      }),
    });
    this.steps.push(step);
  }

  deleteStep(i) {
    this.steps.removeAt(i);
  }

  save() {
    console.log(this.form.value);
  }
}
