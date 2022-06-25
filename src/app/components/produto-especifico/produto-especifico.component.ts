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
    this.produto.id = this.route.snapshot.params['id']
    this.carregarProdutoEspecifico()
    this.getUsuarioById()
    // this.getCarrinhoById()
  }

  carregarProdutoEspecifico(){
    this.produtoService.getById(this.produto.id).subscribe((data: Produto) => {
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
  }

    adicionarProduto(){
      // Configurar um objeto de produto para enviar ao carrinho
      this.carrinho.usuario = this.usuario
      this.carrinho.idProduto = this.produto.id
      this.carrinho.foto = this.produto.foto
      this.carrinho.nomeProduto = this.produto.nome
      this.carrinho.descricao = this.produto.descricao
      this.carrinho.categoria = this.produto.categoria
      this.carrinho.quantidade = this.quantidade
      this.carrinho.valorUnitario = this.produto.preco
      this.carrinho.valorTotal = this.quantidade * this.produto.preco
      this.carrinho.status = 'carrinho'

     if(this.carrinho.quantidade > this.produto.estoque){
      this.alerta.showAlertDanger('Não temos essa quantidade em estoque')
     } else {
      this.salvarCarrinho()
      this.atualizarEstoque()
     }
    }

    salvarCarrinho(){
       // Envia o produto para o carrinho
       this.carrinhoService.save(this.carrinho).subscribe((data: Carrinho)=>{
        this.carrinho = data
        console.log(this.carrinho)
        this.alerta.showAlertSuccess('Carrinho cadastrado com sucesso')
      })
    }

    atualizarEstoque(){
      // Atualiza o estoque disponível
      this.produto.estoque = this.produto.estoque - this.carrinho.quantidade
      this.produtoService.update(this.produto).subscribe((data: Produto)=>{
        this.produto = data
        console.log('Estoque atualizado com sucesso')
      })
    }
  //fim
}
