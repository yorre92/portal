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
import { DataService } from '../services/data.service';

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
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.getServices(0);
  }

  details(s: Service) {
    if (s) this.router.navigate(['services', s.id]);
    else this.router.navigate(['services', '']);
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
  workflowId: number;
}
