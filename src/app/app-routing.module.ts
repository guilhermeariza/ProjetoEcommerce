import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { HistoricoPedidosComponent } from './components/historico-pedidos/historico-pedidos.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { ProdutoEspecificoComponent } from './components/produto-especifico/produto-especifico.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { FormularioDadosClienteComponent } from './components/formulario-dados-cliente/formulario-dados-cliente.component';


const routes: Routes = [
  {path: '', redirectTo:'inico', pathMatch: 'full'},
  {path: 'login', component: CardLoginComponent},
  {path: 'inicio', component: CardHomeComponent},
  {path: 'gerenciarprodutos', component: CadastrarProdutoComponent},
  {path: 'historicopedidos', component: HistoricoPedidosComponent},
  {path: 'produto', component: ProdutoEspecificoComponent},
  {path: 'meuperfil', component: FormularioDadosClienteComponent},
  {path: 'carrinho', component: CarrinhoComponent},

  {path: 'criarconta', component: CriarContaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
