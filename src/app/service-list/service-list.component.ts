import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { nextTick } from 'process';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  services: Service[];
  tag = 'admin';
  currentPage = 0;
  totalCount = 0;
  lastVisible;
  previousLastVisible;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.getServices(0);
  }

  getServices(page) {
    let query = null;

    query = this.firestore.collection<Service>('services', (ref) =>
      ref
        .orderBy('createdAt', 'desc')
        .where('tags', 'array-contains', this.tag)
        .startAfter(
          page > this.currentPage ? this.previousLastVisible : this.lastVisible
        )
        .limit(10)
    );

    query.get().subscribe((querySnapshot) => {
      this.previousLastVisible = this.lastVisible;
      this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      this.totalCount = querySnapshot.size;
      querySnapshot.forEach((doc) => {
        let data = [];
        data.push(doc.data());

        this.services = data;
      });
    });
  }

  next() {
    this.getServices(this.currentPage + 1);
  }

  previous() {
    this.getServices(this.currentPage - 1);
  }
}

export interface Service {
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
}
