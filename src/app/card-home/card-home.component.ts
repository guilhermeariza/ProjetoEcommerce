import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto-service.service';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(){
      this.produto=this.produtoService.getAll()

  }

}
