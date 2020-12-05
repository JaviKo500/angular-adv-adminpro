import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any [] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgresBar', url: 'progres' },
        { title: 'Gráfica', url: 'grafica1' }
      ]
    }
  ]
  constructor() { }
}
