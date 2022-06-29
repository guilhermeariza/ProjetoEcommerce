import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from '../../model/Produto';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos:Produto[]
  listaMaisProcurados=new Array

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(){
    this.getAllProdutos()

  }

  getAllProdutos(){
    this.produtoService.getAll().subscribe((data: Produto[]) => {
     this.listaProdutos = data
     for(let i=0 ; i<4; i++){
      this.listaMaisProcurados.push(this.listaProdutos[i])
    }
    })
  }

  //fim
}
