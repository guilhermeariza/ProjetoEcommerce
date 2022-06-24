import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinho:Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  listaCarrinho: any

  constructor(private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService) { }

  ngOnInit(){
    this.CarregarCarrinho()
  }

  CarregarCarrinho(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.listaCarrinho = this.usuario.carrinho
      console.log(this.listaCarrinho)
    })
  }

  // somaTotal(){
  //   let valorTotal = 0
  //   for(let i=0; i < this.lista.length; i++){
  //     if(this.lista[i].status == 'carrinho'){
  //       this.listaCarrinho[i] = this.lista[i]
  //       valorTotal = this.listaCarrinho[i].produto.preco + valorTotal
  //     }
  //   }
  //   console.log('SOMA '+valorTotal)
  // }

  // seguirParaPagamento(){
  //   for(let i=0; i<this.lista.length; i++){
  //     this.lista[i].status = 'pedido'
  //     this.lista[i].usuario = this.usuario
  //     this.carrinhoService.update(this.lista[i]).subscribe((data: Carrinho)=>{
  //       this.carrinho = data
  //     })
  //   }
  // }

}
