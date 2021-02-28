import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {

  HTTP_URL = environment.BASE_URL;
  private _ocultarModal:  boolean = true;
  tipo: 'usuarios' | 'medicos' | 'hospitales';
  id: string;
  img: string;
  nuevaImagen: EventEmitter<string> = new EventEmitter<string>( );
  constructor() { }
  get getOcultarModal() {
    return this._ocultarModal;
  }

  abrirModal = (tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-image') => {
    this._ocultarModal = false;
    this.tipo= tipo;
    this.id = id;
    if ( img.includes( 'https') ) {
      this.img = img;
    } else {
      this.img = `${this.HTTP_URL}/upload/${tipo}/${img}`;
    }

  }
  cerrarModal = () => {
    this._ocultarModal = true;
  }
}
