import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TelaInicialComponent } from './components/dashboard/main/tela-inicial/tela-inicial.component';
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
import { DescricaoComponent } from './components/dashboard/main/livros/descricao/descricao.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListaLivrosComponent } from './components/layout/pages/lista-livros/lista-livros.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroComponent } from './components/layout/pages/cadastro/cadastro.component';
import { LoginComponent } from './components/layout/pages/login/login.component';
import { MinhaContaComponent } from './components/layout/pages/minha-conta/minha-conta.component';
import { MeuCarrinhoComponent } from './components/layout/pages/meu-carrinho/meu-carrinho.component';
import { PagamentoComponent } from './components/layout/pages/pagamento/pagamento.component';
import { EditarContaComponent } from './components/layout/pages/minha-conta/editar-conta/editar-conta.component';
import { MeusPedidosComponent } from './components/layout/pages/minha-conta/meus-pedidos/meus-pedidos.component';
import { DetalhesLivroComponent } from './components/layout/pages/lista-livros/detalhes-livro/detalhes-livro.component';

export const routes: Routes = [
    {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
    children: [ 
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'home', component: TelaInicialComponent },
      { path: 'livros', component: LivrosComponent},
      { path: 'livros/descricao/:id', component: DescricaoComponent},
      { path: 'livros/criar-livro', component: CriarLivroComponent },
      { path: 'livros/editar-livro/:id', component: EditarLivroComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pedidos/detalhes/:id', component: DetalhesComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'categorias/criar-categoria', component: CriarCategoriaComponent},
      { path: 'categorias/editar-categoria/:id', component: EditarCategoriaComponent},
      { path: 'usuarios', component: UsuariosComponent},
      { path: 'usuarios/endereco/:id', component: EnderecoComponent}
    ]
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'livros', pathMatch: 'full' },
      { path: 'livros', component: ListaLivrosComponent },
      { path: 'livro/:id', component: DetalhesLivroComponent },
      { path: 'login', component:  LoginComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'minha-conta', component: MinhaContaComponent, canActivate: [AuthGuard] },
      { path: 'minha-conta/editar', component: EditarContaComponent, canActivate: [AuthGuard] },
      { path: 'minha-conta/pedidos', component: MeusPedidosComponent, canActivate: [AuthGuard] },
      { path: 'meu-carrinho', component: MeuCarrinhoComponent, canActivate: [AuthGuard] },
      { path: 'pagamento/:id', component: PagamentoComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
