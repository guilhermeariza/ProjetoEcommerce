import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto-service.service';
import { Produto } from '../../model/Produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pesquisa-produto',
  templateUrl: './card-pesquisa-produto.component.html',
  styleUrls: ['./card-pesquisa-produto.component.css']
})
export class CardPesquisaProdutoComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(){
      return this.produtoService.getAllProdutos()
  }
}
