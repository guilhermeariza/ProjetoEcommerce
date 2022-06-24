import { AlertaService } from 'src/app/service/alerta.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { Carrinho } from 'src/app/model/Carrinho';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.css']
})
export class HistoricoPedidosComponent implements OnInit {

  pedido:Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  listaPedidos = new Array
  lista: any = new Carrinho()

  constructor(
    router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.carregarTodosCarrinhos()
  }

  carregarTodosCarrinhos(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{this.usuario = data
      this.pedido = this.usuario.carrinho
      this.lista = this.pedido

      this.listaPedidos = this.lista.filter(function(c: Carrinho){
        return c.status == "pedido"
      })
      console.log(this.listaPedidos)
      console.log(this.lista)
    })
  }

}
