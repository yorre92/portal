import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Service } from '../service-list/service-list.component';
import { finalize } from 'rxjs/operators';
import { easeIn } from '../animations/animations';
import { MatDialog } from '@angular/material/dialog';
import { OrderServiceDialogComponent } from '../order-service-dialog/order-service-dialog.component';
import {
  SimpleSnackBar,
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-service-list',
  templateUrl: './order-service-list.component.html',
  animations: [easeIn()],
  styleUrls: ['./order-service-list.component.css'],
})
export class OrderServiceListComponent implements OnInit {
  services;
  isLoading = false;
  orderBy = 'name';
  pageSize = 5;
  direction = 'right';
  totalCount;
  lastVisible;
  firstVisible;
  currentPage = 1;

  constructor(
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getServices(1);
  }

  openDialog(service: Service) {
    const dialogRef = this.dialog.open(OrderServiceDialogComponent, {
      data: { service: service },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res)
        this.snackBar.open(service.name, 'Ordered', <MatSnackBarConfig>{
          duration: 2000,
        });
    });
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
