import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { finalize } from 'rxjs/operators';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import * as _ from 'lodash';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { slideFromBottom } from '../animations/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-designer',
  templateUrl: './menu-designer.component.html',
  animations: [slideFromBottom()],
  styleUrls: ['./menu-designer.component.css'],
})
export class MenuDesignerComponent implements OnInit {
  thinking = false;
  treeControl = new NestedTreeControl<MenuItem>((node) => node.items);
  dataSource = new MatTreeNestedDataSource<MenuItem>();

  activeNode: MenuItem;
  form: FormGroup;
  isLoading = false;

  hasChild = (_: number, node: MenuItem) =>
    !!node.items && node.items.length > 0;

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.thinking = true;

    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      icon: new FormControl(''),
      route: new FormControl(''),
      isVisible: false,
    });

    this.form.valueChanges.subscribe((res) => {
      if (this.activeNode) {
        this.activeNode.name = res.name;
        this.activeNode.description = res.description;
        this.activeNode.icon = res.icon;
        this.activeNode.route = res.route;
        this.activeNode.isVisible = res.isVisible;
      }
    });

    this.isLoading = true;
    this.firestore
      .collection('menu', (ref) => ref.where('tenantId', '==', 1))
      .get()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((r) => {
        r.forEach((menu) => {
          this.dataSource.data = JSON.parse(menu.data().menuJson);
        });
      });
  }

  move(node: MenuItem, direction) {
    var parent = this.findParent(node, this.dataSource.data, null) as MenuItem;

    console.log(parent);

    let items = parent ? parent.items : this.dataSource.data;

    var nodeIndex = items.findIndex((x) => x.id === node.id);
    console.log(nodeIndex);

    let switchingNodeIndex = null;

    if (direction === 'up') {
      switchingNodeIndex = nodeIndex - 1;
    }

    if (direction === 'down') {
      switchingNodeIndex = nodeIndex + 1;
    }

    if (switchingNodeIndex < items.length && switchingNodeIndex >= 0) {
      const switchingNode = items[switchingNodeIndex];
      items[switchingNodeIndex] = node;
      items[nodeIndex] = switchingNode;

      (node as any).upactive = false; //reset active class
      (node as any).downactive = false;

      this.refreshTree();
    } else {
      console.log('To high or to low index! Not switching');
    }
  }

  edit(node: any) {
    if (
      this.activeNode &&
      node &&
      this.activeNode !== node &&
      this.form.invalid
    ) {
      console.log("Can't change node if form isn't valid.");
      return;
    }

    if (!node) {
      this.activeNode = null;
      this.form.patchValue({});
    } else {
      this.activeNode = node;
      this.form.patchValue(this.activeNode);
    }
  }

  findLevel(id, data, level) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      if (element.id === id) {
        return level;
      } else if (element.items && element.items.length > 0) {
        const l = this.findLevel(id, element.items, level + 1);
        if (l) return l;
      }
    }

    return false;
  }

  addRoot() {
    let item = new MenuItem('Enter name', '', '', '', true, null);
    this.dataSource.data.push(item);
    item = this.dataSource.data[this.dataSource.data.length - 1];
    this.activeNode = item;
    this.form.patchValue(item);
    this.refreshTree();
  }

  add(node: MenuItem) {
    var item = new MenuItem('Enter name', '', '', '', true, null);

    node.items.push(item);
    item = node.items[node.items.length - 1];
    this.activeNode = item;
    this.form.patchValue(item);

    this.refreshTree();
    this.treeControl.expand(node);
  }

  remove(node: MenuItem) {
    var parent = this.findParent(node, this.dataSource.data, null) as MenuItem;
    if (parent) {
      _.remove(parent.items, (x) => {
        return x.id == node.id;
      });
      this.activeNode = null;
      this.edit(parent);
    } else {
      _.remove(this.dataSource.data, (x) => {
        return x.id == node.id;
      });
      this.edit(null);
    }

    this.refreshTree();
  }

  save() {
    this.firestore
      .collection('menu')
      .doc('hlyGtsqeOFLfQbKpZRec')
      .set(<Menu>{
        menuJson: JSON.stringify(this.dataSource.data),
        tenantId: 1,
      })
      .then(
        (res) => {
          this.snackBar.open('Menu', 'Saved', { duration: 2000 });
        },
        (err) => {
          this.snackBar.open(err, 'Could not save menu', { duration: 2000 });
        }
      );
  }

  findParent(node: MenuItem, items: MenuItem[], parent: MenuItem): MenuItem {
    for (let i in items) {
      if (items[i].items && items[i].items.length > 0) {
        var foundParent = this.findParent(node, items[i].items, items[i]);

        if (foundParent) {
          return foundParent;
        }
      }

      if (items[i].id == node.id) {
        return parent;
      }
    }

    return null;
  }

  refreshTree() {
    let _data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = _data;
  }
}

export interface Menu {
  menuJson: string;
  tenantId: number;
}

export class MenuItem {
  items: MenuItem[];
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  isVisible: boolean;

  /**
   *
   */
  constructor(
    name: string,
    description: string,
    icon: string,
    route: string,
    isVisible: boolean,
    items: MenuItem[]
  ) {
    this.id = Guid.newGuid();
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.route = route;
    this.isVisible = isVisible;

    if (items) {
      this.items = items;
    } else {
      this.items = [];
    }
  }
}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
