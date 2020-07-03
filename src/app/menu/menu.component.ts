import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { easeIn } from '../animations/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  animations: [easeIn()],
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  tiles;
  menu;
  level;
  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.firestore
      .collection('menu', (ref) => ref.where('tenantId', '==', 1))
      .get()
      .subscribe((r) => {
        r.forEach((menu) => {
          console.log(menu);
          this.menu = JSON.parse(menu.data().menuJson);
          this.tiles = this.menu;
        });
      });
  }

  navigate(tile) {
    if (tile.items && tile.items.length > 0) {
      this.tiles = tile.items;
    } else {
      this.router.navigate([tile.route]);
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
}
