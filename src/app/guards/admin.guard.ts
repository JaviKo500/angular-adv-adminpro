import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if ( this.usuarioService.getRol === 'ADMIN_ROLE') {
        return true;
      } else {
        Swal.fire('Atención', 'No tiene acceso', 'info')
        this.router.navigateByUrl('/dashboard');
        return false;
      }
    // return ( this.usuarioService.getRol === 'ADMIN_ROLE' ) ? true : false;
  }
  
}
