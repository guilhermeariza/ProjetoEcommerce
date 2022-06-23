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


@Component({
  selector: 'app-produto-especifico',
  templateUrl: './produto-especifico.component.html',
  styleUrls: ['./produto-especifico.component.css']
})
export class ProdutoEspecificoComponent implements OnInit {
  produto: Produto = new Produto()
  id: any

  carrinho: Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  idCarrinho: any


  constructor(private route: ActivatedRoute,
     private produtoService: ProdutoService,
     private auth: AuthService,
     private carrinhoService: CarrinhoService,
     private alerta: AlertaService) { }

  ngOnInit() {
    this.produto.id = this.route.snapshot.params['id']
    this.carregarProdutoEspecifico()
    this.getAllCarrinhoUsuario()
  }

  carregarProdutoEspecifico(){
    this.produtoService.getById(this.produto.id).subscribe((data: Produto) => {
      this.produto = data

    })
  }
// ------------------------------

  // Buscar o usuario no BD usando o id
  getAllCarrinhoUsuario(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
    })
  }

  getCarrinhoById(){
    this.carrinhoService.getById().subscribe((data: Carrinho)=>{
      this.carrinho = data

    })
  }

    adicionarProduto(){
    this.carrinho.usuario = this.usuario
    this.carrinho.produto = this.produto
    this.carrinho.status = false
    this.carrinhoService.save(this.carrinho).subscribe((data: Carrinho)=>{
      this.carrinho = data
      console.log(this.carrinho)
      this.alerta.showAlertSuccess('Carrinho cadastrado com sucesso')
      // this.carrinho = new Carrinho
    })
  }

  //fim
}
