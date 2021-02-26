import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formSubmitted = false;

  usuario: Usuario;
  imagenSubir: File;
  imgTemp: string = '';
  perfilForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private usarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = this.usarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.formbuilder.group({
      nombre: [this.usuario.nombre || '', Validators.required],
      email: [this.usuario.email || '', [ Validators.required, Validators.email]]
    });
  }
  actualizarPerfil = (): void => {
    this.usarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe( () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Datos actualizados', 'success');
    }, (err) => {
      Swal.fire('Error', `${err.error.msg}`, 'error');
    });
  };

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

  subirImagen = (): void => {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        if ( img.ok === false ){
          Swal.fire('error', `${img.msg}`, 'error');
        } else {
          this.usuario.img = img;
          Swal.fire('Guardado', 'Imagen actualizada', 'success');
        }
      })
      .catch( err => {
        Swal.fire('error', `${err.error.msg}`, 'error');
      });
  };

}
