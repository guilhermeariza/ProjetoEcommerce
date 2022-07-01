import { Data } from 'popper.js';
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
  listaPedidos: Carrinho[] = [];
  lista: any = new Carrinho()

  somaDosProdutos: number

  grupo = new Array

  item = new Array

  x = new Array

  valor = new Array

  constructor(
    router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.carregarTodosCarrinhos()
  }

  dias:string[] = [];

  carregarTodosCarrinhos(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.lista = this.usuario.carrinho

      this.listaPedidos = this.lista.filter(function(c: Carrinho){
        return c.status == "pedido"
      })

      console.log(this.listaPedidos)

      this.listaPedidos.forEach((item) => {
        if(!this.dias.includes(item.data)){
          this.dias.push(item.data)
        }
      })

      this.somaTotal()

    })
  }

  selectedDia:string = '';
  setSelectedDia(dia:string){
    this.selectedDia = dia
  }

  getPedidosByDia(){
    return [...this.listaPedidos].filter(item => {
       return item.data == this.selectedDia
    })
  }

  somaTotal(){
    this.somaDosProdutos = 0

    //fazer um filtro por data do carrinho
    for(let i=0; i < this.listaPedidos.length; i++){
      this.somaDosProdutos = this.listaPedidos[i].valorTotal + this.somaDosProdutos
    }
  }

}

