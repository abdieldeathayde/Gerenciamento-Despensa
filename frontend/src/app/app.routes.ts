import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { DespensasComponent } from './pages/despensas.component';
import { ProdutosComponent } from './pages/produtos.component';
import { ListaComprasComponent } from './pages/lista-compras.component';
import { EstoqueComponent } from './pages/estoque.component';
import { LoginComponent } from './pages/login.component';
import { CadastroComponent } from './pages/cadastro.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Entrar | Minha Despensa' },
  { path: 'cadastro', component: CadastroComponent, title: 'Criar conta | Minha Despensa' },
  { path: '', component: DashboardComponent, title: 'Dashboard | Minha Despensa' },
  { path: 'despensas', component: DespensasComponent, title: 'Despensas | Minha Despensa' },
  { path: 'produtos', component: ProdutosComponent, title: 'Produtos | Minha Despensa' },
  { path: 'estoque', component: EstoqueComponent, title: 'Estoque e validade | Minha Despensa' },
  { path: 'lista-compras', component: ListaComprasComponent, title: 'Lista de compras | Minha Despensa' },
  { path: '**', redirectTo: '' }
];
