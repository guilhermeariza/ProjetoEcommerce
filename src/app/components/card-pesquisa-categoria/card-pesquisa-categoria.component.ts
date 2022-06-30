import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-card-pesquisa-categoria',
  templateUrl: './card-pesquisa-categoria.component.html',
  styleUrls: ['./card-pesquisa-categoria.component.css']
})
export class CardPesquisaCategoriaComponent implements OnInit {

  categoria: string
  categoriaId: number
  listaCategoria: Produto[]

  produto: Produto = new Produto
  listaProduto: Produto[]
  lista = new Array

  constructor(private router: Router,private categoriaService: CategoriaService, private produtoService: ProdutoService, private route: ActivatedRoute) {
   }

  ngOnInit(){
    this.pegarCategoriaRota()

  }

  pegarCategoriaRota(){
    this.route.queryParams.subscribe(params => {
      this.categoriaId = params['id']
      this.categoria = params['nomeCategoria']
      this.getProduto()
    })
  }

  getProduto(){
    let id = this.categoriaId
    this.produtoService.getAll().subscribe((data: Produto[])=>{
      this.lista = data
      this.lista.forEach(item => {
        item.preco = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      })

      this.listaCategoria = this.lista.filter(function(c: Produto){
        return c.categoria.id == id
      })
    })
  }
}
