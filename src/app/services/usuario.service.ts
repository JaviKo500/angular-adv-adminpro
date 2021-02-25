import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

// google sing in
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private HTTP_URL = environment.BASE_URL;
   // google sing in
   auth2: any;
  constructor( 
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone 
  ) {
    this.googleInit();
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.HTTP_URL}/login/renew`, { headers: { 'x-token': token}})
              .pipe(
                tap((response:  any) => {
                  localStorage.setItem('token', response.token)
                }),
                map( response => true),
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
