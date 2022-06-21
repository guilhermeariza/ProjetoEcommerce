import { CarrinhoService } from './../../service/carrinho.service';
import { Carrinho } from './../../model/Carrinho';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  carrinho:any = new Carrinho
  listaCarrinhos: any = new Carrinho

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.carrinhoService.getAll().subscribe((data: Carrinho) => {
      this.listaCarrinhos = data
    },(error: any) => {
      console.log('Erro', error)
    })
  }

}
