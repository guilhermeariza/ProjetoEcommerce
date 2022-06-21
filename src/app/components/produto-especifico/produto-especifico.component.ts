import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';


@Component({
  selector: 'app-produto-especifico',
  templateUrl: './produto-especifico.component.html',
  styleUrls: ['./produto-especifico.component.css']
})
export class ProdutoEspecificoComponent implements OnInit {
  id: any
  produtoEspecifico: any = new Produto
  produto: any = new Produto

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })

    this.carregarProdutoEspecifico(this.produto)
  }

  carregarProdutoEspecifico(produto: Produto){
    produto.id = this.id
    this.produtoService.getById(produto).subscribe((data: Produto) => {
      this.produtoEspecifico = data
    })
  }

  adicionarNoCarrinho(produtoEspecifico: Produto){

  }

  //fim
}
