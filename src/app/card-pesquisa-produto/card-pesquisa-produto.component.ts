import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../produto-service.service';

@Component({
  selector: 'app-card-pesquisa-produto',
  templateUrl: './card-pesquisa-produto.component.html',
  styleUrls: ['./card-pesquisa-produto.component.css']
})
export class CardPesquisaProdutoComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(){
      this.produto=this.produtoService.getAll()

  }
}
