import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Medico } from '../models/medico.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  HTTP_URL = environment.BASE_URL;
  constructor(
    private http: HttpClient
  ) { }
  get getToken(): string {
    return localStorage.getItem('token') || '';
  }
  get getHeaders(): any {
    return {headers: { 'x-token': this.getToken }};
  }

  listaMedicos = () => {
    return this.http.get(`${this.HTTP_URL}/medicos`, this.getHeaders)
                    .pipe(
                      map( (response: any) => response.medicos as Medico[]),
                    );
  }
  getMedicoPorId = ( _id: string ) => {
    return this.http.get(`${this.HTTP_URL}/medicos/${_id}`, this.getHeaders)
                    .pipe(
                      map( (response: any) => response.medico as Medico)
                    );
  }

  crearMedico = ( medico: {nombre: string, hospital: string} ) => {
    return this.http.post(`${this.HTTP_URL}/medicos`, medico, this.getHeaders);
  }
  actualizarMedico = (  medico: {nombre: string, hospital: string, _id: string} ) => {
    return this.http.put(`${this.HTTP_URL}/medicos/${medico._id}`, medico, this.getHeaders);
  }
  borrarMedico = ( _id: string ) => {
    return this.http.delete(`${this.HTTP_URL}/medicos/${_id}`, this.getHeaders);
  }
}
