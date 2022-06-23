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
  produto: Produto = new Produto()
  listaProduto: Produto[]

  constructor(private router: Router, private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.produto.nome = params['nome']
    })
    this.carregarPesquisaPorNome()

  }

  carregarPesquisaPorNome(){
    this.produtoService.getbyName(this.produto.nome).subscribe((data: Produto[]) => {
      this.listaProduto = data
      this.produto = new Produto
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }
}
