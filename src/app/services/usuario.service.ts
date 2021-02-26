import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

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
  };

  logOut = () => {
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run( () =>{
        this.router.navigateByUrl('/login');
      });
    });
  };

  validarToken = (): Observable<boolean> => {
    return this.http.get(`${this.HTTP_URL}/login/renew`, { headers: { 'x-token': this.getToken}})
              .pipe(
                map((response:  any) => {
                  const { email, google, img = '', nombre, rol, uid } = response.usuario;
                  this.usuario = new Usuario( nombre, email, '', img, google, rol, uid);
                  localStorage.setItem('token', response.token);                  
                  return true
                }),
                catchError( error => {
                  return of(false);
                })
              );
  }
  crearUsuario = ( formData: RegisterForm) => {
    return this.http.post(`${this.HTTP_URL}/usuarios`, formData)
              .pipe(
                tap( (response: any) => {
                  localStorage.setItem('token', response.token);
                })
              );
  };

  actualizarUsuario = (data: { email: string, nombre: string, rol: string }) => {
    data = {
      ...data,
      rol: this.usuario.role
    };
    return this.http.put(`${this.HTTP_URL}/usuarios/${this.getUid}`,data, { headers: { 'x-token': this.getToken} });
  };

  login = ( formData: LoginForm) => {
    return this.http.post(`${this.HTTP_URL}/login`, formData)
              .pipe(
                tap( (response: any) => {
                  localStorage.setItem('token', response.token);
                })
              );
  };
  loginGoogle = ( token) => {
    return this.http.post(`${this.HTTP_URL}/login/google`, {token})
              .pipe(
                tap( (response: any) => {
                  localStorage.setItem('token', response.token);
                })
              );
  };

}
