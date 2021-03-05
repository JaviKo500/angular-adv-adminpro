import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
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

  listaHospitales = () => {
    return this.http.get<Hospital[]>(`${this.HTTP_URL}/hospital`, this.getHeaders)
               .pipe(
                 map( (response: any) => response.hospitales as Hospital[] )
               );
  }
  crearHospital = ( nombre: string ) => {
    return this.http.post(`${this.HTTP_URL}/hospital`, { nombre }, this.getHeaders);
  }
  actualizarHospital = ( _id: string, nombre: string ) => {
    return this.http.put(`${this.HTTP_URL}/hospital/${_id}`, { nombre }, this.getHeaders);
  }
  borrarHospital = ( _id: string ) => {
    return this.http.delete(`${this.HTTP_URL}/hospital/${_id}`, this.getHeaders);
  }
}
