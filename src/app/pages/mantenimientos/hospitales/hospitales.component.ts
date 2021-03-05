import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  hospitales: Hospital [] = [];
  hospitalesTemp: Hospital [] = [];
  cargando = true;
  private imgSubs: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImgService,
    private busquedaService: BusquedasService
  ) { }
  
  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs = this.modalImageService.nuevaImagen
        .pipe(
         delay(100)
        )
        .subscribe( img => {
          this.cargarHospital();
        });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospital = () => {
    this.hospitalService.listaHospitales()
        .subscribe( hospitales => {
          this.hospitales = hospitales;
          this.cargando = false;
          this.hospitalesTemp = hospitales;
        });
  }
  crearHospital = async () => {
    const { value: text= '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true
    });
    if (text.trim().length >= 2 ) {
      this.hospitalService.crearHospital(text)
      .subscribe( (response: any) => {
            Swal.fire('Creado', `${text}`, 'success');
            // console.log(response);
            this.hospitales.push(response.hospitalDB)
          });
    }else{
       Swal.fire('Atención', 'ingrese almenos 2 caracteres', 'warning');
    }
  }
  actualizarHospital = (hospital: Hospital) => {
    this.hospitalService.actualizarHospital( hospital._id , hospital.nombre)
        .subscribe( response => {
          // console.log(response);
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  }
  eliminarHospital = ( hospital: Hospital ) => {
    this.hospitalService.borrarHospital(hospital._id)
        .subscribe( response => {
          this.cargarHospital();
          Swal.fire('Eliminado', hospital.nombre, 'success');
        });
  }
  buscarHospitalTermino = ( termino: string ) => {
    if ( termino.length === 0 ){
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedaService.buscarData( 'hospitales', termino )
        .subscribe( (response: Hospital[] ) => {
          this.hospitales = response;
        });
  }
  abrirModalImg = (hospital: Hospital) => {
    this.modalImageService.abrirModal( 'hospitales', hospital._id, hospital.img);
  }

}
