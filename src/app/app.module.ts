import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CadastrarProdutoComponent } from './components/cadastrar-produto/cadastrar-produto.component';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { CardPesquisaProdutoComponent } from './components/card-pesquisa-produto/card-pesquisa-produto.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CarrosselComponent } from './components/carrossel/carrossel.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProdutoEspecificoComponent } from './components/produto-especifico/produto-especifico.component';
import { FormularioDadosClienteComponent } from './components/formulario-dados-cliente/formulario-dados-cliente.component';
import { TabelaCartaoCreditoComponent } from './components/tabela-cartao-credito/tabela-cartao-credito.component';
import { TabelaEnderecoComponent } from './components/tabela-endereco/tabela-endereco.component';
import { CriarContaComponent } from './components/criar-conta/criar-conta.component';
import { CadastroAdmComponent } from './components/cadastro-adm/cadastro-adm.component';
import {CarouselModule} from 'primeng/carousel';
import {AccordionModule} from 'primeng/accordion';
declare var $:any;


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardPesquisaProdutoComponent,
    CardHomeComponent,
    FooterComponent,
    CadastrarProdutoComponent,
    CardLoginComponent,
    CarrinhoComponent,
    CarrosselComponent,
    FormularioDadosClienteComponent,
    TabelaCartaoCreditoComponent,
    TabelaEnderecoComponent,
    ProdutoEspecificoComponent,
    CriarContaComponent,
    CadastroAdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    AccordionModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
