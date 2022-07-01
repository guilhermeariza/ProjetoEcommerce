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
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  //Instanciando as classes
  carrinho:Carrinho = new Carrinho()
  cartao: CartaoCredito = new CartaoCredito()
  endereco: Endereco = new Endereco()
  usuario:Usuario = new Usuario()
  produto:Produto = new Produto()

  //Listas para interagir com o html
  listaCarrinho: Carrinho[]
  listaCartao:CartaoCredito[]
  listaEndereco: Endereco[]

  //Lista para fazer o filtro por status
  lista: any

  //Variável para exibir a soma dos produtos no html
  somaDosProdutos: number

  //variavel para contar os itens do carrinho
  qtdItens: number

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService,
    private produtoService: ProdutoService,
    private cartaoService: CartaoCreditoService,
    private enderecoService: EnderecoService
  ) { }

  ngOnInit() {
    this.CarregarCarrinho()
  }

  pegarSelectEndereco(event: any){
    const id = event.target.value
    this.enderecoService.getById(id).subscribe((data: Endereco)=>{
      this.endereco = data
    })
    console.log(this.endereco)
  }

  pegarSelectCartao(event: any){
    const id = event.target.value
    this.cartaoService.getById(id).subscribe((data: CartaoCredito)=>{
      this.cartao = data
    })
    console.log(this.cartao)
  }

  //Método para buscar o usuario pelo id, e retornar os cartoes, endereços e carrinho.
  CarregarCarrinho(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.lista = this.usuario.carrinho //Armazena o carrinho do usuario dentro da lista para fazer o filtro
      this.listaCartao = this.usuario.cartaoCredito //Armazena os cartões do usuario em listaCartao
      this.listaEndereco = this.usuario.endereco //Armazena os endereços do usuario em listaEndereco
      this.listaCarrinho = this.lista.filter(function(c: Carrinho){return c.status == 'carrinho'}) //Função para armazenar em listaCarrinho o fitro da lista por status
      this.somaTotal()
    })

  }

  somaTotal(){
    this.somaDosProdutos = 0
    this.qtdItens = 0
    for(let i=0; i < this.listaCarrinho.length; i++){
      this.somaDosProdutos = this.listaCarrinho[i].valorTotal + this.somaDosProdutos
      this.qtdItens = this.qtdItens + 1
    }
  }

  excluirProduto(id: number, idProduto: number, quantidade: number){
    this.carrinhoService.delete(id).subscribe(()=>{
      this.alerta.showAlertWarning(`Produto excluído com sucesso`)
      this.atualizarEstoque(idProduto, quantidade)
      this.CarregarCarrinho()
      this.ngOnInit()
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
    const user = new Usuario()
    user.id = this.usuario.id
    this.listaCarrinho.forEach((item: Carrinho) => {
      item.usuario = user
      item.status = 'pedido'
      item.apelidoCartao = this.cartao.apelido
      item.endereco = this.endereco.endereco

    })
    this.carrinhoService.fazerPedido(this.listaCarrinho).subscribe((resp: Carrinho[])=>{
      this.CarregarCarrinho()
      this.alerta.showAlertSuccess('Pedido finalizado com sucesso')
    })
    console.log(this.listaCarrinho)
  }

}
