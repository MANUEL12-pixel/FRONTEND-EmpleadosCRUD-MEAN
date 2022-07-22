import { EmpleadosListComponent } from './components/empleados-list/empleados-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosFormComponent } from './components/empleados-form/empleados-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/empleados',
    pathMatch: 'full'
  },
  {
    path: 'empleados',
    component: EmpleadosListComponent
  },
  {
    path: 'empleados/agregar',
    component: EmpleadosFormComponent
  },
  {
    path: 'empleados/editar/:id',
    component: EmpleadosFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
