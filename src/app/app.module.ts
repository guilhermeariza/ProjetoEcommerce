import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardPesquisaProdutoComponent } from './card-pesquisa-produto/card-pesquisa-produto.component';
import { CardHomeComponent } from './card-home/card-home.component';
import { CardLoginComponent } from './card-login/card-login.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardPesquisaProdutoComponent,
    CardHomeComponent,
    FooterComponent,
    CadastrarProdutoComponent,
    CardLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
