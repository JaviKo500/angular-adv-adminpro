import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImgService } from '../../../services/modal-img.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {
  medicos: Medico [] = [];
  medicosTemp: Medico [] = [];
  cargando = true;
  imgSub: Subscription;
  constructor(
    private medicoService: MedicoService,
    private busquedaService: BusquedasService,
    private modalImgService: ModalImgService
  ) { }
  
  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSub = this.modalImgService.nuevaImagen
    .pipe(
      delay(100)
      )
      .subscribe( img => {
        this.cargarMedicos();
      });
    }
  ngOnDestroy(): void {
    this.imgSub.unsubscribe();  
  }
    cargarMedicos = () => {
    this.medicoService.listaMedicos()
        .subscribe( medicos => {
          this.medicos = medicos;
          this.medicosTemp = medicos;
          this.cargando = false;
        });
  }
  buscarMedicoTermino = ( termino: string ) => {
    if ( termino.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedaService.buscarData( 'medicos', termino )
        .subscribe ( ( response: Medico[]) => {
          this.medicos = response;
        });
  }
  eliminarMedico = ( medico: Medico) => {
    Swal.fire({
      title: 'Atención',
      text: `Desea eliminar a ${medico.nombre}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico( medico._id )
        .subscribe( response => {
          Swal.fire( 'Eliminado', `${medico.nombre}`, 'success');
          this.cargarMedicos();
        });
      }
    });
  }

  abrirModal = ( medico: Medico ) => {
    this.modalImgService.abrirModal('medicos', medico._id, medico.img);
  }

}
