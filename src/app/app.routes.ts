import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TelaInicialComponent } from './components/dashboard/tela-inicial/tela-inicial.component';
import { LivrosComponent } from './components/dashboard/livros/livros.component';
import { CriarLivroComponent } from './components/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [ 
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'home', component: TelaInicialComponent },
      { path: 'livros', component: LivrosComponent},
      { path: 'livros/criar-livro', component: CriarLivroComponent },
      { path: 'livros/editar-livro', component: EditarLivroComponent },
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];
