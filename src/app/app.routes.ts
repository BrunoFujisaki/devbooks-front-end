import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TelaInicialComponent } from './components/dashboard/tela-inicial/tela-inicial.component';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [ 
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'home', component: TelaInicialComponent },
      
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];
