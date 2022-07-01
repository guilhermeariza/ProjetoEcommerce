import { Carrinho } from 'src/app/model/Carrinho';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.css']
})
export class HistoricoPedidosComponent implements OnInit {
  usuario: Usuario = new Usuario()
  listaPedidos = new Array
  lista: any = new Carrinho()
  somaDosProdutos: string

  //variaveis para o orderBy
  key = 'data'
  reverse = true

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(){
    this.carregarTodosCarrinhos()
  }

  carregarTodosCarrinhos(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.lista = this.usuario.carrinho
      this.listaPedidos = this.lista.filter(function(c: Carrinho){
        return c.status == "pedido"
      })
      this.formatarValor()
    })
  }

  formatarValor(){
    for(let i=0; i < this.listaPedidos.length; i++){
      this.listaPedidos[i].valorTotal = this.listaPedidos[i].valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  }
}
