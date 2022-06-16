import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
<<<<<<< HEAD
import { ProdutoEspecificoComponent } from './components/produto-especifico/produto-especifico.component';
=======
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { FormularioDadosClienteComponent } from './components/formulario-dados-cliente/formulario-dados-cliente.component';

>>>>>>> f3c7af89d69f1b3ba9694d55e7c892f8ca554efa

const routes: Routes = [
  {path: '', redirectTo:'inico', pathMatch: 'full'},
  {path: 'login', component: CardLoginComponent},
  {path: 'inicio', component: CardHomeComponent},
  {path: 'gerenciarprodutos', component: CadastrarProdutoComponent},
  {path: 'carrinho', component: CarrinhoComponent},
<<<<<<< HEAD
  {path: 'produto', component: ProdutoEspecificoComponent}
=======
  {path: 'meuperfil', component: FormularioDadosClienteComponent},
  {path: 'criarconta', component: CriarContaComponent}
>>>>>>> f3c7af89d69f1b3ba9694d55e7c892f8ca554efa

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
