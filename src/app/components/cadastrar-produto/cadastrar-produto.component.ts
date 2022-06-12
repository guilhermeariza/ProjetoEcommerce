import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto-service.service';
import { Router } from '@angular/router';
import * as $ from 'jQuery';

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

  editarProduto(id:number){
    const i = this.produto.findIndex((produto, index, array) => produto.id === id);
    $('#idProdutoEditar').text(this.produto[i].id)
    $('#nomeProdutoEditar').val(this.produto[i].nome)
    $('#precoProdutoEditar').val(this.produto[i].preco)
    $('#qtdProdutoEditar').val(this.produto[i].quantidade)
    $('#descricaoProdutoEditar').val(this.produto[i].descricao)
    $("#categoriaProdutoEditar option:contains("+this.produto[i].categoria+")").attr('selected', 'true');
    $('#fotoProdutoEditar').val(this.produto[i].foto)
    console.log(this.produto[i])
  }

  excluirProduto(id:number){
    const i = this.produto.findIndex((produto, index, array) => produto.id === id);
    $('#idProdutoExcluir').text(this.produto[i].id)
    $('#nomeProdutoExcluir').text(this.produto[i].nome)
  }
}
