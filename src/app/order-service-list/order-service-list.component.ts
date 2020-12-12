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
import { DataService } from '../services/data.service';

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
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getServices(0);
  }

  openDialog(service: Service) {
    const dialogRef = this.dialog.open(OrderServiceDialogComponent, {
      data: { service: service },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((input) => {
      if (input) {
        this.dataService
          .createOrder({
            input: input,
            workflowJson: '',
            serviceId: service.id,
          })
          .subscribe((res) => {
            this.snackBar.open(service.name, 'Ordered', <MatSnackBarConfig>{
              duration: 2000,
            });
          });

        // this.data{
        //     input: input,
        //     createdAt: new Date().toString(),
        //     orderedBy: 'carl',
        //     workflowJson: '',
        //     serviceId: service.id,
        //   })
        //   .then((res) => {
        //     this.snackBar.open(service.name, 'Ordered', <MatSnackBarConfig>{
        //       duration: 2000,
        //     });
        //   });
      }
    });
  }

  getServices(page) {
    const skipCount = page * this.pageSize;
    const maxResultCount = this.pageSize;

    this.dataService.listServices(page, maxResultCount).subscribe((res) => {
      this.totalCount = res.totalCount;
      this.services = res.items;
    });
  }

  next() {
    this.getServices(this.currentPage + 1);
    this.currentPage += 1;
  }

  previous() {
    if (this.currentPage <= 1) {
      return;
    }

    this.getServices(this.currentPage - 1);
    this.currentPage -= 1;
  }
}

export interface CreateOrder {
  input: string;
  workflowJson: string;
  serviceId: string;
}
