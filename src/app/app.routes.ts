import { Routes } from '@angular/router';
import { Employees } from './employees/employees';

export const routes: Routes = [
  { path: 'employees', component: Employees },
  { path: '', redirectTo: 'employees', pathMatch: 'full' }
];
