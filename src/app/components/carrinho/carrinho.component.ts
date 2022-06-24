import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
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
  listaCarrinho = new Array
  lista: any = new Carrinho()

  constructor(private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService) { }

  ngOnInit(){
    this.CarregarCarrinho()

  }

  CarregarCarrinho(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{this.usuario = data
      this.carrinho = this.usuario.carrinho
      this.lista = this.carrinho

      this.listaCarrinho = this.lista.filter(function(c: Carrinho){
        return c.status == 'carrinho'
      })
      this.somaTotal()
    },(error: any) => {
        switch(error.status){
          case 400:
            this.alerta.showAlertDanger('Erro na requisção, erro: '+error.status)
          break;
          case 401:
            this.alerta.showAlertDanger('Acesso não autorizado, erro: '+error.status)
          break;
          case 500:
            this.alerta.showAlertDanger('Erro na aplicação, erro: '+error.status)
          break;
        }
      })
  }

  somaTotal(){
    let somaDosProdutos = 0
    for(let i=0; i < this.listaCarrinho.length; i++){
      somaDosProdutos = this.listaCarrinho[i].valorUnitario + somaDosProdutos
    }
    console.log('SOMA DOS PRODUTOS NO CARRINHO: '+ somaDosProdutos)
  }

  excluirProduto(id: number){
    this.carrinhoService.delete(id).subscribe(()=>{

    })
  }

  seguirParaPagamento(){
    for(let i=0; i<this.listaCarrinho.length; i++){
      this.listaCarrinho[i].status = 'pedido'
      this.listaCarrinho[i].usuario = this.usuario
    }
    console.log(this.listaCarrinho)
  }

  confirmarPagamento(){
    this.carrinhoService.update(this.carrinho).subscribe((data: Carrinho)=>{
      this.carrinho = data
    })
  }
}
