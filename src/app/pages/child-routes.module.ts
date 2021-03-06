import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'}},
      { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Búsquedas'}},
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Graficas'}},
      { path: 'perfil', component: PerfilComponent, data: { title: 'My perfil usuario'}},
      { path: 'progres', component: ProgressComponent, data: { title: 'Progress'}},
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'}},

      // ,amteniminetos
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'}},
      { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos'}},
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Médico'}},
      // rutas admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Usuarios'}},
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
