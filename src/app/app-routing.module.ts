import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ProdutoEspecificoComponent } from './components/produto-especifico/produto-especifico.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { FormularioDadosClienteComponent } from './components/formulario-dados-cliente/formulario-dados-cliente.component';
import { CadastroAdmComponent } from './components/cadastro-adm/cadastro-adm.component';
import { CardPesquisaProdutoComponent } from './components/card-pesquisa-produto/card-pesquisa-produto.component';
const routes: Routes = [
  {path: '', redirectTo:'inicio', pathMatch: 'full'},
  {path: 'login', component: CardLoginComponent},
  {path: 'inicio', component: CardHomeComponent},
  {path: 'gerenciarprodutos', component: CadastrarProdutoComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'produto', component: ProdutoEspecificoComponent},
  {path: 'meuperfil', component: FormularioDadosClienteComponent},
  {path: 'criarconta', component: CriarContaComponent},
  {path: 'produto', component: ProdutoEspecificoComponent},
  {path: 'meuperfil', component: FormularioDadosClienteComponent},
  {path: 'criarconta', component: CriarContaComponent},
  {path: 'administracaoelertech', component: CadastroAdmComponent},
  {path: 'administracaoelertech', component: CadastroAdmComponent},
  {path: 'pesquisar', component: CardPesquisaProdutoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
