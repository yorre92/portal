import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { slideFromBottom } from '../animations/animations';
import { Service } from '../service-list/service-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  id;
  service;
  form: FormGroup;
  elements: any[];
  tag;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cost: 0,
      currency: '',
      description: '',
      elements: '',
      hasManagerApproval: false,
      hasSystemApproval: false,
      name: '',
      tags: [],
      tenantId: 0,
      thumbnail: '',
    });

    this.route.params.subscribe((res) => {
      this.id = res['id'];
      if (this.id) {
        this.firestore
          .collection('services')
          .doc(this.id)
          .get()
          .subscribe((snapshot) => {
            this.service = snapshot.data();
            this.form.patchValue(this.service);

            if (this.service.elements)
              this.elements = JSON.parse(this.service.elements);
            else this.elements = [];
          });
      } else {
        this.elements = [];
      }
    });
  }

  get tags() {
    return this.form.get('tags');
  }

  addTag() {
    let list = this.tags.value as string[];

    if (!list) list = [];

    list.push(this.tag);
    this.tags.patchValue(list);

    this.tag = '';
  }

  removeTag(i) {
    this.tags.value.splice(i, 1);
  }

  updateFormValue($event) {
    // this.elements = $event;
  }

  elementFormState(state) {
    if (state === 'INVALID') this.form.setErrors({ elementsinvalid: true });
    else this.form.setErrors(null);
  }

  save() {
    let service = this.form.value as Service;
    service.elements = JSON.stringify(this.elements);

    if (this.id) {
      this.firestore
        .collection('services')
        .doc(this.id)
        .set(service)
        .then((res) => this.snackBar.open('Menu', 'Saved', { duration: 2000 }));
    } else {
      this.firestore
        .collection('services')
        .add(service)
        .then((res) => {
          this.snackBar.open('Menu', 'Created', { duration: 2000 });
          this.router.navigate(['services']);
        });
    }
  }
}
