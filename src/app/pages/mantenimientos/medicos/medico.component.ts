import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [];
  hospitalSeleccionado: Hospital;
  medicoSeleccionado: Medico;
  medicoForm: FormGroup;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService
  ){}

  ngOnInit(): void {
    this.getMedicoPorId();
    this.cargarHospitales();
    this.medicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    // cuando ahy un cambio en el select
    this.medicoForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find( hospital => hospital._id === hospitalId);
        });
  }
  // para ver si hsy un id en la url de medico
  getMedicoPorId = () => {
    this.activatedRouter.params
        .subscribe( ({id}) => {
          if (id === 'nuevo'){
            return;
          }
          this.medicoService.getMedicoPorId( id )
                .pipe(
                  delay(100)
                )
                .subscribe( medico => {
                  const { nombre, hospital: { _id } } = medico;
                  this.medicoSeleccionado = medico;
                  this.medicoForm.setValue({nombre, hospital: _id});
                }, err => this.router.navigateByUrl('dashboard/medicos'));
        });
  }
  guardarMedico = () => {
    const {nombre} = this.medicoForm.value;
    if ( this.medicoSeleccionado ) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoService.actualizarMedico( data )
          .subscribe( response => {
            console.log(response);
            Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success')
          });
    } else {
      if ( this.medicoForm.valid) {
        this.medicoService.crearMedico( this.medicoForm.value )
            .subscribe( response => {
              Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
              this.router.navigateByUrl('dashboard/medicos');
            });
      }
    }
  }

  cargarHospitales = () => {
    this.hospitalService.listaHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
  }

}
