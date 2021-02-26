import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  HTTP_URL = environment.BASE_URL;
  constructor() { }
  actualizarFoto  = async( archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) => {
    try {
      const URL = `${this.HTTP_URL}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const response = await fetch( URL, {
        method: 'PUT',
        headers: {'x-token': localStorage.getItem('token') || ''},
        body: formData
      });
      const data = await response.json();
      if ( data.ok ) {
        return data.nombreArchivo;
      } else {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
