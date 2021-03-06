import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

  }
  logOut = () => {
    this.usuarioService.logOut();
  }

  buscarTermino = ( termino: string ) => {
    if ( termino.trim().length === 0){
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
