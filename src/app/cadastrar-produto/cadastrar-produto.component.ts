import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../produto-service.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(){
      this.produto=this.produtoService.getAll()
  }

  editarProduto(produto: Produto){

  }

}
