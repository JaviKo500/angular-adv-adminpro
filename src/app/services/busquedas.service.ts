import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private HTTP_URL = environment.BASE_URL;
  constructor(
    private http: HttpClient
  ) { }
  get getToken(): string {
    return localStorage.getItem('token') || '';
  }
  get getHeaders(): any {
    return {headers :{ 'x-token': this.getToken }};
  } 
  
  private transformarUsuarios = ( resultados: any[]): Usuario[] => {
    const usuarios = resultados.map(
      (user: Usuario) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.rol, user.uid)
      );          
    return usuarios;
  }

  buscarData = ( tipo: 'usuarios' | 'medicos' | 'hospitales' , termino: string) => {
    return this.http.get<any[]>(`${this.HTTP_URL}/total/coleccion/${tipo}/${termino}`, this.getHeaders)
                    .pipe(
                      map( (response: any) => {
                        switch (tipo) {
                          case 'usuarios':
                            return this.transformarUsuarios( response.resultado);
                          case 'hospitales':
                            return [];
                          case 'medicos':
                            return [];
                          default:
                            return [];
                        }
                      } )
                    );
  };
}
