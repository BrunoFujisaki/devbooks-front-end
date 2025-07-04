import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TelaInicialComponent } from './components/dashboard/tela-inicial/tela-inicial.component';
import { CriarLivroComponent } from './components/dashboard/main/livros/criar-livro/criar-livro.component';
import { EditarLivroComponent } from './components/dashboard/main/livros/editar-livro/editar-livro.component';
import { PedidosComponent } from './components/dashboard/main/pedidos/pedidos.component';
import { DetalhesComponent } from './components/dashboard/main/pedidos/detalhes/detalhes.component';
import { LivrosComponent } from './components/dashboard/main/livros/livros.component';
import { CategoriasComponent } from './components/dashboard/main/categorias/categorias.component';
import { CriarCategoriaComponent } from './components/dashboard/main/categorias/criar-categoria/criar-categoria.component';
import { EditarCategoriaComponent } from './components/dashboard/main/categorias/editar-categoria/editar-categoria.component';
import { UsuariosComponent } from './components/dashboard/main/usuarios/usuarios.component';
import { EnderecoComponent } from './components/dashboard/main/usuarios/endereco/endereco.component';

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
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pedidos/detalhes', component: DetalhesComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'categorias/criar-categoria', component: CriarCategoriaComponent},
      { path: 'categorias/editar-categoria/:id', component: EditarCategoriaComponent},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'usuarios/endereco', component: EnderecoComponent}
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
];
