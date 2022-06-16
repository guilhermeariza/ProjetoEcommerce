import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto-service.service';
import { Produto } from '../../model/Produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent implements OnInit {

  produto: Produto[]=[]
  maisVendidos: Produto[] = []

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(){
    this.maisVendidos = this.produtoService.getFour()
  }
}
