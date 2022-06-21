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
  nome: any
  preco: any
  estoque: any
  descricao: any
  categoria: any
  foto: any

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
      this.nome = params['nome']
      this.preco = params['preco']
      this.estoque = params['estoque']
      this.descricao = params['descricao']
      this.foto = params['foto']
    })
  }

  //fim
}
