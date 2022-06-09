import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './card-home/card-home.component';
import { CardLoginComponent } from './card-login/card-login.component';

const routes: Routes = [
  {path: '', redirectTo:'inico', pathMatch: 'full'},
  {path: 'login', component: CardLoginComponent},
  {path: 'inicio', component: CardHomeComponent},
  {path: 'gerenciarprodutos', component: CadastrarProdutoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
