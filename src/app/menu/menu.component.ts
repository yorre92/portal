import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { easeIn } from '../animations/animations';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getMenu().subscribe((res) => {
      this.menu = res.menu;
      this.tiles = res.menu;
      console.log(this.menu);
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
