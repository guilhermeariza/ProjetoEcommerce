import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { CarrinhoService } from 'src/app/service/carrinho.service';

@Component({
  selector: 'app-historico-pedidos',
  templateUrl: './historico-pedidos.component.html',
  styleUrls: ['./historico-pedidos.component.css']
})
export class HistoricoPedidosComponent implements OnInit {

  carrinho:any = new Carrinho
  listaCarrinhos: any = new Carrinho

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
  }

  getAll(){
    this.carrinhoService.getAll().subscribe((data: Carrinho) => {
      this.listaCarrinhos = data
    },(error: any) => {
      console.log('Erro', error)
    })
  }

}
