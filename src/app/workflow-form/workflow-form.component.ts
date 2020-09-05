import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { easeIn, slideFromBottom } from '../animations/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workflow-form',
  templateUrl: './workflow-form.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./workflow-form.component.css'],
})
export class WorkflowFormComponent implements OnInit {
  @Input('form') form: FormGroup;
  id;
  selectedStep = 0;

  stepTypes = [
    { name: 'Notification', value: 'notification' },
    { name: 'Http Request', value: 'httprequest' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      description: '',
      steps: this.fb.array([]),
    });

    this.route.params.subscribe((res) => {
      this.id = res['id'];
      if (this.id) {
        let query = this.firestore.collection('workflows').doc(this.id);

        query.get().subscribe((snapshot) => {
          let workflow = snapshot.data();
          this.form.patchValue({
            name: workflow.name,
            description: workflow.description,
          });
          console.log(workflow);
        });

        this.firestore
          .collection('workflowSteps', (ref) =>
            ref.where('workflowId', '==', this.id)
          )
          .get()
          .pipe(
            map((querySnapshot) => {
              let steps = [];

              querySnapshot.forEach((doc) => {
                let step = doc.data();

                if (step.request) step.request = JSON.parse(step.request);
                step.id = doc.id;
                steps.push(step);
              });

              return steps;
            })
          )
          .subscribe((steps) => {
            console.log(steps);
            steps.forEach((step) => {
              this.addStep(step, step.request);
            });
          });
      }
    });
  }

  get steps() {
    return this.form.get('steps') as FormArray;
  }

  addStep(step, request) {
    let params = this.fb.array([]);
    let headers = this.fb.array([]);

    if (request && request.params) {
      request.params.forEach((param) => {
        params.push(this.fb.group(param));
      });
    }

    if (request && request.headers) {
      request.headers.forEach((header) => {
        headers.push(this.fb.group(header));
      });
    }

    this.steps.push(
      this.fb.group({
        id: step.id ?? new FormControl(step.id),
        type: step.type,
        request: this.fb.group({
          url: request ? request.url : '',
          headers: headers,
          params: params,
          body: request ? request.body : '',
          method: request ? request.method : '',
          resultVariable: request ? request.resultVariable : '',
        }),
      })
    );

    setTimeout(() => {
      this.selectedStep = this.steps.length - 1;
    }, 100);
  }

  deleteStep(i) {
    this.steps.removeAt(i);

    this.selectedStep = i - 1;
  }

  save() {
    console.log(this.form.value);
    let promises: Promise<any>[] = [];

    if (this.id) {
      promises.push(
        this.firestore
          .collection('workflows')
          .doc(this.id)
          .set({
            name: this.form.get('name').value,
            description: this.form.get('description').value,
          })
      );

      this.steps.value.forEach((step) => {
        step.request = JSON.stringify(step.request);
        step.workflowId = this.id;

        if (step.id) {
          promises.push(
            this.firestore.collection('workflowSteps').doc(step.id).set(step)
          );
        } else {
          promises.push(this.firestore.collection('workflowSteps').add(step));
        }
      });

      Promise.all(promises).then(() =>
        this.snackBar.open('Workflow', 'Saved', { duration: 2000 })
      );
    } else {
      this.firestore
        .collection('workflows')
        .add({
          name: this.form.get('name').value,
          description: this.form.get('description').value,
        })
        .then((res) => {
          this.steps.value.forEach((step) => {
            step.request = JSON.stringify(step.request);
            step.workflowId = res.id;

            if (step.id) {
              promises.push(
                this.firestore
                  .collection('workflowSteps')
                  .doc(step.id)
                  .set(step)
              );
            } else {
              promises.push(
                this.firestore.collection('workflowSteps').add(step)
              );
            }
          });
          Promise.all(promises).then(() => {
            this.snackBar.open('Workflow', 'Created', { duration: 2000 });
            this.router.navigate(['workflows']);
          });
        });
    }
  }
}
