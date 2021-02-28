import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImgService } from '../../../services/modal-img.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  totalUsuarios: number = 0;
  usuarios: Usuario [] = [];
  usuariosTemp: Usuario [] = [];
  desde:number = 0;
  imgSubs: Subscription;
  cargando: boolean = true;
  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImgService: ModalImgService
  ) { }
  ngOnDestroy(): void {
    // para desuscribirme del emit , para evitar fuga de memoria
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    //  cuando carga de imagenes
    this.imgSubs = this.modalImgService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe( img => {
          this.cargarUsuarios();
        });
  }
  cargarUsuarios = (): void => {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios; 
      this.usuariosTemp = usuarios;       
      this.cargando = false; 
    }); 
  };

  cambiarPagina = ( valor: number): void => {
    this.desde += valor;
    if ( this.desde < 0  ) {
      this.desde = 0;
    } else if ( this.desde > this.totalUsuarios) {
      this.desde -=valor;
    }
    this.cargarUsuarios();
  };

  buscar = ( termino: string ): void => {
    if ( termino.length === 0) { 
      this.usuarios = this.usuariosTemp;
      return; 
    } 
    this.busquedaService.buscarData(  'usuarios', termino )
        .subscribe( response => {
          console.log(response);
          this.usuarios = response;
        });
  };

  eliminarUsuario = ( usuario: Usuario): void => {
    if ( usuario.uid === this.usuarioService.getUid) {
      Swal.fire('Error' , 'No te puedes borrar a ti mismo', 'error');
      return;
    }
    Swal.fire({
      title: 'Desea eliminar a: ',
      text: `${usuario.nombre} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario )
            // @ts-ignore
            .subscribe( ({ok, msg}) => {
              Swal.fire( ` ${usuario.nombre}`, `${msg}`, 'success' );
              this.cargarUsuarios();
            });
      }
    })
  };
  cambiarRole = (usuario: Usuario) => {
    this.usuarioService.guardarUsuario(usuario)
        .subscribe( response => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado',
            showConfirmButton: false,
            timer: 500
          });
        });
  };

  abrirModalImg = (usuario: Usuario) => {
    this.modalImgService.abrirModal('usuarios', usuario.uid, usuario.img);
  };
}
