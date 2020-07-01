import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  id;
  service;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private fb: FormBuilder
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
      console.log(res);
      if (this.id) {
        this.firestore
          .collection('services')
          .doc(this.id)
          .get()
          .subscribe((snapshot) => {
            this.service = snapshot.data();
            console.log(this.service);
            this.form.patchValue(this.service);
          });
      }
    });
  }
}
