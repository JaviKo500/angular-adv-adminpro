import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {
  menuItems: any;
  constructor( private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }
  ngOnInit(): void {
  }

}
