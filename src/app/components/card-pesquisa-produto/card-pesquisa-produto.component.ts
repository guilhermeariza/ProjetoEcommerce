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
  listaProduto =  new Array
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


  abrirProdutoEspecifico(produto: Produto){
    this.router.navigate(['/produto'],{queryParams: produto})
  }

  carregarPesquisaPorNome(){
    this.produtoService.getbyName(this.nome).subscribe((data: Produto[]) => {
      this.listaProduto = data
      this.listaProduto.forEach(item => {
        item.preco = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      })
    })
  }
}
