import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CursosComponent } from './cursos/cursos.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: ClienteComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'clientes/form',
    component: FormComponent
  },
  {
    path: 'clientes/form/:id',
    component: FormComponent
  },
  {
    path: 'clientes/page/:page',
    component: ClienteComponent
  }
];
