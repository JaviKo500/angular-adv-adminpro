import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imgTemp: string = '';

  
  constructor(
    public modalImgService: ModalImgService,
    private uploadFileSerice: FileUploadService
  ) { }

  ngOnInit(): void {
  }
  cerrarModal = () => {
    this.imgTemp = null;
    this.modalImgService.cerrarModal();
  }
  cambiarImagen = ( file: File ): void => {
    this.imagenSubir = file;
    if ( !file ) { 
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };
  };

  cargarFoto = () => {    
    const id   = this.modalImgService.id;
    const tipo = this.modalImgService.tipo;
    this.uploadFileSerice.actualizarFoto( this.imagenSubir, tipo, id)
        .then( img => {
          if ( img.ok === false) {
            this.modalImgService.cerrarModal();
            Swal.fire('Error', `${img.msg}`,'error');
          } else {
            this.modalImgService.cerrarModal();
            Swal.fire('Guardado', 'Imagen actualizada', 'success');
            this.modalImgService.nuevaImagen.emit(img);
          }
        })
        .catch( err => {
          Swal.fire('error', `${err.error.msg}`, 'error');
        });
  }
}
