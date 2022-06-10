import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardPesquisaProdutoComponent } from './card-pesquisa-produto/card-pesquisa-produto.component';
import { FormularioDadosClienteComponent } from './formulario-dados-cliente/formulario-dados-cliente.component';
import { TabelaCartaoComponent } from './tabela-cartao/tabela-cartao.component';
import { TabelaEnderecoComponent } from './tabela-endereco/tabela-endereco.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardPesquisaProdutoComponent,
    FormularioDadosClienteComponent,
    TabelaCartaoComponent,
    TabelaEnderecoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
