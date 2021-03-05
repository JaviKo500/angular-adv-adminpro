import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const base_url = environment.BASE_URL;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if ( img === undefined || !img) {
      return `${base_url}/upload/${tipo}/no-image`;
    } else if ( img.includes('https')) {
      return img;
    } else if ( img ) {
      return `${base_url}/upload/${tipo}/${img}`;
    } else {
      return `${base_url}/upload/${tipo}/no-image`;
    }
    return 'hola mundo';
  }

}
