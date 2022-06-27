import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Carrinho } from 'src/app/model/Carrinho';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-produto-especifico',
  templateUrl: './produto-especifico.component.html',
  styleUrls: ['./produto-especifico.component.css']
})
export class ProdutoEspecificoComponent implements OnInit {
  produto: Produto = new Produto()
  id: any
  quantidade: any
  carrinho: Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()


  constructor(private route: ActivatedRoute,
     private produtoService: ProdutoService,
     private auth: AuthService,
     private carrinhoService: CarrinhoService,
     private alerta: AlertaService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.carregarProdutoEspecifico()
    this.getUsuarioById()
    this.quantidade = $('#quantidade').val()
  }

  carregarProdutoEspecifico(){
    this.produtoService.getById(this.id).subscribe((data: Produto) => {
      this.produto = data

    })
  }
// ------------------------------

  // Buscar o usuario no BD usando o id
  getUsuarioById(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.carrinho.id = this.usuario.carrinho.id
    })
  }

  logado(){
    let usuarioLogado:boolean = false
    if(environment.token != ''){
      usuarioLogado = true
    }
    return usuarioLogado
  }

  pegarQuantidade(event: any){
    this.quantidade = event.target.value
    console.log(this.quantidade)
  }
  aumentar(){
    let n = $('#quantidade').val()
    ++n
    $('#quantidade').val(n)
    this.quantidade = $('#quantidade').val()
  }

  diminuir(){
    let n = $('#quantidade').val()
    --n
    $('#quantidade').val(n)
    this.quantidade = $('#quantidade').val()

    if(n<0){
      $('#quantidade').val(0)
    }
  }

    adicionarProduto(){
      if(this.auth.logado()){
          // Configurar um objeto de produto para enviar ao carrinho
          this.carrinho.usuario = this.usuario
          this.carrinho.idProduto = this.produto.id
          this.carrinho.foto = this.produto.foto
          this.carrinho.nomeProduto = this.produto.nome
          this.carrinho.descricao = this.produto.descricao
          this.carrinho.categoria = this.produto.categoria.nomeCategoria
          this.carrinho.quantidade = this.quantidade
          this.carrinho.valorUnitario = this.produto.preco
          this.carrinho.valorTotal = this.quantidade * this.produto.preco
          this.carrinho.status = 'carrinho'

         if(this.carrinho.quantidade > this.produto.estoque){
            this.alerta.showAlertDanger('Não temos essa quantidade em estoque')
          } else if(this.carrinho.quantidade <= 0){
            this.alerta.showAlertDanger('Adicione produtos ao carrinho')
          } else {
            this.salvarCarrinho()
            this.atualizarEstoque()
          }
      } else{
        this.alerta.showAlertDanger('É necessário esta logado para fazer uma assinatura')
      }
    }

    salvarCarrinho(){
      this.auth.getById(environment.id).subscribe((data: Usuario)=>{
        this.usuario = data
      })
       if(this.usuario.carrinho.idProduto == this.produto.id){
        this.carrinhoService.update(this.carrinho).subscribe((data: Carrinho)=>{
          this.carrinho = data
          console.log(this.carrinho)
        })
       } else if(this.usuario.carrinho.idProduto != this.produto.id){
        this.carrinhoService.save(this.carrinho).subscribe((data: Carrinho)=>{
          this.carrinho = data
          console.log(this.carrinho)
        })
      }
    }

    atualizarEstoque(){
      // Atualiza o estoque disponível
      this.produto.estoque = this.produto.estoque - this.carrinho.quantidade
      this.produtoService.update(this.produto).subscribe((data: Produto)=>{
        this.produto = data
      })
    }
  //fim
}
