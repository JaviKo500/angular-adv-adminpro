import { Usuario } from './../models/usuario.model';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';


import { environment } from 'src/environments/environment.prod';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario, MensajeUsuario } from '../interfaces/cargar-usuarios.interface';

// google sing in
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private HTTP_URL = environment.BASE_URL;
   // google sing in
   auth2: any;

   usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }
  get getToken(): string {
    return localStorage.getItem('token') || '';
  }
  get getUid(): string {
    return this.usuario.uid || '';
  }
  get getRol(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.rol;
  }
  get getHeaders(): any {
    return {headers: { 'x-token': this.getToken }};
  }
  gurdarLocalStorage = (token: string, menu: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  googleInit = () => {
    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '929928563524-tp18eefc127gdumsl8euah92c72sg63n.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then( () => {
      this.ngZone.run( () =>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken = (): Observable<boolean> => {
    return this.http.get(`${this.HTTP_URL}/login/renew`, { headers: { 'x-token': this.getToken}})
              .pipe(
                map((response: any) => {
                  const { email, google, img = '', nombre, rol, uid } = response.usuario;
                  this.usuario = new Usuario( nombre, email, '', img, google, rol, uid);
                  this.gurdarLocalStorage(response.token, response.menu);
                  return true;
                }),
                catchError( error => {
                  return of(false);
                })
              );
  }

  login = ( formData: LoginForm) => {
    return this.http.post(`${this.HTTP_URL}/login`, formData)
    .pipe(
      tap( (response: any) => {
        this.gurdarLocalStorage(response.token, response.menu);
      })
      );
    }
    loginGoogle = ( token) => {
      return this.http.post(`${this.HTTP_URL}/login/google`, {token})
      .pipe(
        tap( (response: any) => this.gurdarLocalStorage(response.token, response.menu))
        );
      }
crearUsuario = ( formData: RegisterForm) => {
  return this.http.post(`${this.HTTP_URL}/usuarios`, formData)
            .pipe(
              tap( (response: any) => {
                this.gurdarLocalStorage(response.token, response.menu);
              }),
              catchError( error => {
                console.log(error);
                return throwError(error);
              })
            );
}

actualizarUsuario = (data: { email: string, nombre: string, rol: string }) => {
    data = {
      ...data,
      rol: this.usuario.rol
    };
    return this.http.put(`${this.HTTP_URL}/usuarios/${this.getUid}`,data, this.getHeaders);
}

cargarUsuarios = ( desde: number = 0 )=> {
  return this.http.get<CargarUsuario>(`${this.HTTP_URL}/usuarios?desde=${desde}`, this.getHeaders)
            .pipe(
             // delay(1000),
              map( (response: any) => {                
                const usuarios = response.usuarios.map(
                  (usuario: Usuario) => new Usuario( usuario.nombre ,usuario.email, '', usuario.img, usuario.google, usuario.rol, usuario.uid))
                return {total: response.total, usuarios};
              })
            );
}

eliminarUsuario = ( usuario: Usuario ) => {
  return this.http.delete<MensajeUsuario>(`${this.HTTP_URL}/usuarios/${usuario.uid}`, this.getHeaders);
}
guardarUsuario = (usuario: Usuario) => {
  return this.http.put(`${this.HTTP_URL}/usuarios/${usuario.uid}`,usuario, this.getHeaders);
}
}
