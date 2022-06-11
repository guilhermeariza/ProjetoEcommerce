import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(){
      this.produto=this.produtoService.getAll();
  }

  editarProduto(produto: Produto){

  }

}
