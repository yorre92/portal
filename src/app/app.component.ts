import { Component, AfterViewInit } from '@angular/core';
import { MenuItem } from './Models/MenuItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'portal';

  menu: MenuItem[] = [
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
        { name: 'Forms', link: '/form-designer', children: null },
        { name: 'Menu', link: '/form-designer', children: null },
        { name: 'Theme', link: '/form-designer', children: null },
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

  ngAfterViewInit() {
    const darkButton = document.getElementById('dark');
    const lightButton = document.getElementById('light');
    const solarButton = document.getElementById('solar');
    const body = document.body;

    // Apply the cached theme on reload
    const theme = localStorage.getItem('theme');
    const isSolar = localStorage.getItem('isSolar');

    if (theme) {
      body.classList.add(theme);
      isSolar && body.classList.add('solar');
    }

    // Button Event Handlers

    darkButton.onclick = () => {
      body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    };

    lightButton.onclick = () => {
      body.classList.replace('dark', 'light');

      localStorage.setItem('theme', 'light');
    };

    solarButton.onclick = () => {
      if (body.classList.contains('solar')) {
        body.classList.remove('solar');
        solarButton.style.cssText = `
      --bg-solar: var(--yellow);
    `;

        solarButton.innerText = 'solarize';

        localStorage.removeItem('isSolar');
      } else {
        solarButton.style.cssText = `
      --bg-solar: white;
    `;

        body.classList.add('solar');
        solarButton.innerText = 'normalize';

        localStorage.setItem('isSolar', 'true');
      }
    };
  }
}
