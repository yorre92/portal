import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { nextTick } from 'process';
import { Router } from '@angular/router';
import { slideFromBottom } from '../animations/animations';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: Service[];
  tag = 'admin';
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;
  orderBy = 'name';
  lastVisible;
  firstVisible;
  direction = 'right';
  isLoading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.getServices(this.currentPage);
  }

  details(s: Service) {
    if (s) this.router.navigate(['services', s.id]);
    else this.router.navigate(['services', '']);
  }

  getServices(page) {
    let query: AngularFirestoreCollection<Service> = null;
    this.isLoading = true;

    if (page === 1) {
      query = this.firestore.collection<Service>('services', (ref) =>
        ref.orderBy(this.orderBy).limit(this.pageSize)
      );
    } else if (this.direction === 'right' && this.totalCount <= this.pageSize) {
      query = this.firestore.collection<Service>('services', (ref) =>
        ref
          .orderBy(this.orderBy)
          .startAfter(this.lastVisible)
          .limit(this.pageSize)
      );
    } else if (this.direction === 'left' && page > 1) {
      query = this.firestore.collection<Service>('services', (ref) =>
        ref
          .orderBy(this.orderBy)
          .endBefore(this.firstVisible)
          .limitToLast(this.pageSize)
      );
    }

    query
      .get()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((querySnapshot) => {
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        this.firstVisible = querySnapshot.docs[0];

        this.totalCount = querySnapshot.size;
        let data = [];

        querySnapshot.forEach((doc) => {
          let service = doc.data();
          service.id = doc.id;
          data.push(service);

          this.services = data;
        });
      });
  }

  next() {
    this.direction = 'right';
    this.getServices(this.currentPage + 1);
    this.currentPage += 1;
  }

  previous() {
    if (this.currentPage <= 1) {
      return;
    }

    this.direction = 'left';
    this.getServices(this.currentPage - 1);
    this.currentPage -= 1;
  }
}

export interface Service {
  id: string;
  cost: number;
  currency: string;
  description: string;
  elements: string;
  hasManagerApproval: boolean;
  hasSystemApproval: boolean;
  name: string;
  tags: string[];
  tenantId: number;
  thumbnail: string;
  workflowId: string;
}
