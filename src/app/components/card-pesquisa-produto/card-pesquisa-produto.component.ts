import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from '../../model/Produto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-pesquisa-produto',
  templateUrl: './card-pesquisa-produto.component.html',
  styleUrls: ['./card-pesquisa-produto.component.css']
})
export class CardPesquisaProdutoComponent implements OnInit {
  produto: any = new Produto
  listaProdutoPesquisado: any

  constructor(private router: Router, private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.produto.nome = params['nome']
    })
    this.carregarPesquisaPorNome(this.produto)

  }

  carregarPesquisaPorNome(produto: Produto){
    this.produtoService.getbyName(produto).subscribe((data: Produto) => {
      this.listaProdutoPesquisado = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }

  getAll(){
    this.produtoService.getAll().subscribe((data: Produto) => {
     this.produto = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }
}
