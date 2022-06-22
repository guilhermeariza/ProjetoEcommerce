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
  produto: Produto = new Produto()
  id: any

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produto.id = params['id']
    })

    this.carregarProdutoEspecifico()
  }

  carregarProdutoEspecifico(){
    this.produtoService.getById(this.produto.id).subscribe((data: Produto) => {
      this.produto = data
    })
  }

  adicionarNoCarrinho(produto: Produto){

  }

  //fim
}
