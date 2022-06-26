import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { AlertaService } from 'src/app/service/alerta.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: string
  produto: any = new Produto
  environment: any;

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]

  constructor( private categoriaService: CategoriaService,private router: Router, private alerta: AlertaService) { }

  ngOnInit() {
    this.getAllCategoria()
    this.usuario = environment.usuario
  }

  sair(){
    this.alerta.showAlertSuccess('Esperamos te ver em breve '+environment.nomeFantasia+'!')
    this.router.navigate(['/login'])
    environment.token = ''
    environment.usuario = ''
    environment.tipo = ''
    environment.id = 0
  }

  pesquisarPorNome(){
    this.produto.nome = $('#barraPesquisa').val()
    this.router.navigate(['/pesquisar'],{queryParams: this.produto})
    this.produto = new Produto()
  }

  pesquisarPorCategoria(categoria: Categoria){
    this.router.navigate(['/pesquisarcategoria'],{queryParams: categoria})
  }

  admLogado(){
    let admLogado: boolean = false
    if(environment.tipo == 'adm'){
      admLogado = true
    }
    return admLogado
  }

  logado(){
    let usuarioLogado:boolean = false
    if(environment.token != ''){
      usuarioLogado = true
    }
    return usuarioLogado
  }

  naoLogado(){
    let usuarionaoLogado:boolean = false
    if(environment.token == ''){
      usuarionaoLogado = true
    }
    return usuarionaoLogado
  }

  getAllCategoria(){
    return this.categoriaService.getAll().subscribe((data: Categoria[])=>{
      this.listaCategoria = data
    })
  }
}
