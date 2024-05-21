import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CursosComponent } from './cursos/cursos.component';

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
  }
];
