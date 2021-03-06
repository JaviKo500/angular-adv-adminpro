import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutentificado => {
          if ( !estaAutentificado ){
            this.router.navigateByUrl('/login');
          }
        })
        );
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.usuarioService.validarToken()
      .pipe(
        tap( estaAutentificado => {
          if ( !estaAutentificado ){
            this.router.navigateByUrl('/login');
          }
        })
        );
      }

  
}
