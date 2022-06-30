import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from '../../model/Produto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card-pesquisa-produto',
  templateUrl: './card-pesquisa-produto.component.html',
  styleUrls: ['./card-pesquisa-produto.component.css']
})
export class CardPesquisaProdutoComponent {
  produto: Produto = new Produto()
  listaProduto: Produto[]
  nome: string

  constructor(private router: Router, private produtoService: ProdutoService, private route: ActivatedRoute) {

  }

  ngOnInit(){
    this.pegarParametroRota()
  }

  pegarParametroRota(){
    this.route.queryParams.subscribe(params => {
      this.nome = params['nome']
      this.carregarPesquisaPorNome()
    })
  }

  carregarPesquisaPorNome(){
    this.produtoService.getbyName(this.nome).subscribe((data: Produto[]) => {
      this.listaProduto = data
    })
  }
}
