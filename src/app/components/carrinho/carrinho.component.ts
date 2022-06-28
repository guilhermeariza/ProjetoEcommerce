import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { CartaoCredito } from 'src/app/model/CartaoCredito';
import { Endereco } from 'src/app/model/Endereços';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  carrinho:Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  produto: Produto = new Produto()
  listaCarrinho: any
  lista: any = new Carrinho()
  somaDosProdutos: number
  listaCartao:CartaoCredito[]
  listaEndereco: Endereco[]

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.CarregarCarrinho()
  }

  CarregarCarrinho(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      console.log(this.usuario)
      this.carrinho = this.usuario.carrinho
      this.lista = this.carrinho
      this.listaCartao = this.usuario.cartaoCredito
      this.listaEndereco = this.usuario.endereco
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
    this.somaDosProdutos = 0
    for(let i=0; i < this.listaCarrinho.length; i++){
      this.somaDosProdutos = this.listaCarrinho[i].valorTotal + this.somaDosProdutos
    }
  }

  excluirProduto(id: number, idProduto: number, quantidade: number){
    console.log(id, idProduto, quantidade)
    this.atualizarEstoque(idProduto, quantidade)
    this.carrinhoService.delete(id).subscribe(()=>{
      this.ngOnInit()
      this.alerta.showAlertWarning(`Produto excluído com sucesso`)
    })
  }

  atualizarEstoque(idProduto: number, quantidade: number){
    // busca o produto no estoque
    this.produtoService.getById(idProduto).subscribe((data: Produto)=>{
      this.produto = data
      // Atualiza o estoque disponível
      this.produto.estoque = this.produto.estoque + quantidade
      this.produtoService.update(this.produto).subscribe((data: Produto)=>{
      this.produto = data
      console.log('Estoque atualizado com sucesso')
      this.produto = new Produto
      })
    })
  }

  finalizarPedido(){
    this.carrinhoService.fazerPedido(this.carrinho).subscribe((resp: Carrinho)=>{
      this.carrinho = resp
      console.log(this.carrinho)
      this.alerta.showAlertSuccess('Pedido finalizado com sucesso')
    })
    console.log(this.carrinho)
  }

}
