import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {
  menuItems: any;

  usuario: Usuario;
  constructor( 
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }
  ngOnInit(): void {
  }
  logOut = (): void => {
    this.usuarioService.logOut();
  }

}
