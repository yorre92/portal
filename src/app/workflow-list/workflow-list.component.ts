import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { slideFromBottom } from '../animations/animations';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./workflow-list.component.css'],
})
export class WorkflowListComponent implements OnInit {
  workflows: Workflow[];
  tag = 'admin';
  currentPage = 1;
  pageCount = 0;
  pageSize = 10;
  orderBy = 'name';
  lastVisible;
  firstVisible;
  direction = 'right';
  isLoading = false;
  totalCount = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getWorkflows(this.currentPage);
  }

  details(s: Workflow) {
    if (s) this.router.navigate(['workflows', s.id]);
    else this.router.navigate(['workflows', '']);
  }

  getWorkflows(page) {
    const skipCount = page * this.pageSize;
    const maxResultCount = this.pageSize;

    this.dataService.listWorkflows(0, 10).subscribe((res) => {
      this.totalCount = res.totalCount;
      this.workflows = res.items;
    });
  }

  // getWorkflows(page) {
  //   let query: AngularFirestoreCollection<Workflow> = null;
  //   this.isLoading = true;

  //   if (page === 1) {
  //     query = this.firestore.collection<Workflow>('workflows', (ref) =>
  //       ref.orderBy(this.orderBy).limit(this.pageSize)
  //     );
  //   } else if (this.direction === 'right' && this.pageCount <= this.pageSize) {
  //     query = this.firestore.collection<Workflow>('workflows', (ref) =>
  //       ref
  //         .orderBy(this.orderBy)
  //         .startAfter(this.lastVisible)
  //         .limit(this.pageSize)
  //     );
  //   } else if (this.direction === 'left' && page > 1) {
  //     query = this.firestore.collection<Workflow>('workflows', (ref) =>
  //       ref
  //         .orderBy(this.orderBy)
  //         .endBefore(this.firstVisible)
  //         .limitToLast(this.pageSize)
  //     );
  //   }

  //   query
  //     .get()
  //     .pipe(finalize(() => (this.isLoading = false)))
  //     .subscribe((querySnapshot) => {
  //       this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //       this.firstVisible = querySnapshot.docs[0];

  //       this.pageCount = querySnapshot.size;
  //       let data = [];

  //       querySnapshot.forEach((doc) => {
  //         let service = doc.data();
  //         service.id = doc.id;
  //         data.push(service);
  //         console.log(data);

  //         this.workflows = data;
  //       });
  //     });
  // }

  next() {
    this.getWorkflows(this.currentPage + 1);
    this.currentPage += 1;
  }

  previous() {
    if (this.currentPage <= 1) {
      return;
    }

    this.getWorkflows(this.currentPage - 1);
    this.currentPage -= 1;
  }
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: any[];
}
