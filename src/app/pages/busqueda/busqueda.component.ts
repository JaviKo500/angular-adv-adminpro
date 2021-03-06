import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  hospitales: Hospital [] = [];
  usuarios: Usuario [] = [];
  medicos: Medico [] = [];
  constructor(
    private activatedRouter: ActivatedRoute,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
        .subscribe( ({ termino }) => {
          this.datosBusquedaGlobal(termino);
        });
  }

  datosBusquedaGlobal = ( termino: string ) => {
    this.busquedaService.busquedaGlobal( termino )
        // @ts-ignore
        .subscribe( ({ hospitales, medicos, usuarios}) => {
          this.hospitales = hospitales;
          this.usuarios = usuarios;
          this.medicos = medicos;
        });
  }
}
