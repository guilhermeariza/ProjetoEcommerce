import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { CartaoCredito } from 'src/app/model/CartaoCredito';
import { Endereco } from 'src/app/model/Endereços';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinho:Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  listaCarrinho: any
  lista: any = new Carrinho()
  somaDosProdutos: number
  listaCartao:CartaoCredito[]
  listaEndereco: Endereco[]

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService,
    private cartao: CartaoCreditoService,
    private endereco: EnderecoService
  ) { }

  ngOnInit() {
    this.CarregarCarrinho()
  }

  CarregarCarrinho(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{this.usuario = data
      this.carrinho = this.usuario.carrinho
      this.lista = this.carrinho
      this.listaCartao = this.usuario.cartaoCredito
      this.listaEndereco = this.usuario.endereco
      this.listaCarrinho = this.lista.filter(function(c: Carrinho){
        return c.status == 'carrinho'
      })
      this.somaTotal()
    },(error: any) => {
        switch(error.status){
          case 400:
            this.alerta.showAlertDanger('Erro na requisção, erro: '+error.status)
          break;
          case 401:
            this.alerta.showAlertDanger('Acesso não autorizado, erro: '+error.status)
          break;
          case 500:
            this.alerta.showAlertDanger('Erro na aplicação, erro: '+error.status)
          break;
        }
      })
  }

  somaTotal(){
    this.somaDosProdutos = 0
    for(let i=0; i < this.listaCarrinho.length; i++){
      this.somaDosProdutos = this.listaCarrinho[i].valorUnitario + this.somaDosProdutos
    }
  }

  excluirProduto(id: number){
    this.carrinhoService.delete(id).subscribe(()=>{
      this.alerta.showAlertWarning(`Produto excluído com sucesso`)
    })
  }

  finalizarPedido(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.listaCarrinho = this.usuario.carrinho
      console.log(this.listaCarrinho)
      for(this.carrinho of this.listaCarrinho){
        this.carrinho.status = "pedido"
        this.carrinhoService.update(this.carrinho).subscribe((resp: Carrinho)=>{
          this.carrinho = resp
          this.alerta.showAlertSuccess('Pedido finalizado com sucesso')
        }
        )
      }
    })
  }

}
