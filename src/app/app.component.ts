import { Component, AfterViewInit } from '@angular/core';
import { MenuItem } from './Models/MenuItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'portal';

  menu: MenuItem[] = [
    {
      name: 'Home',
      link: '',
      children: null,
    },
    {
      name: 'Settings',
      link: '',
      children: [{ name: 'Test', link: '/form-designer', children: null }],
    },
    {
      name: 'Catalogue',
      link: '',
      children: [
        { name: 'Services', link: '/services', children: null },
        { name: 'Workflows', link: '/workflows', children: null },
        { name: 'Forms', link: '/form-designer', children: null },
        { name: 'Menu', link: '/menu-designer', children: null },
        { name: 'Theme', link: '/theme', children: null },
      ],
    },
  ];

  constructor() {}

  openDropdown(item) {
    item.openDropdown = true;
  }

  closeDropdown(item) {
    item.openDropdown = false;
  }

  onDropdownNavigate($event) {
    const target = $event.target as HTMLElement;
    console.log(target.parentElement.parentElement);
    target.parentElement.parentElement.style.visibility = 'hidden';
    target.parentElement.parentElement.style.opacity = '0';
  }
}
