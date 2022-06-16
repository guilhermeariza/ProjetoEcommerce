import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { SobreComponent } from './components/sobre/sobre.component';

const routes: Routes = [
  {path: '', redirectTo:'inico', pathMatch: 'full'},
  {path: 'login', component: CardLoginComponent},
  {path: 'inicio', component: CardHomeComponent},
  {path: 'gerenciarprodutos', component: CadastrarProdutoComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'sobre', component: SobreComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
