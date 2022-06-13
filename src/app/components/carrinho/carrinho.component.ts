import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto-service.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinho: Carrinho[]=[produto: Produto[]=[]]
  produto: Produto[]=[]

  constructor(private router: Router, private carrinhoService: CarrinhoService, private produtoService: ProdutoService) { }

  ngOnInit(){
    this.carrinho=this.carrinhoService.getAll()
  }

}
