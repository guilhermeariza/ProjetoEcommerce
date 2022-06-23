import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AlertaService } from 'src/app/service/alerta.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario = environment.usuario
  produto: any = new Produto
  environment: any;

  constructor(private router: Router, private alerta: AlertaService) { }

  ngOnInit() {
  }

  sair(){
    this.alerta.showAlertSuccess('Esperamos te ver em breve '+environment.nomeFantasia+'!')
    this.router.navigate(['/login'])
    environment.token = ''
    environment.usuario = ''
    environment.id = 0
  }

  pesquisar(){
    this.produto.nome = $('#barraPesquisa').val()
    this.router.navigate(['/pesquisar'],{queryParams: this.produto})
    this.produto = new Produto
  }

  admLogado(){
    let admLogado: boolean = false
    if(environment.tipo == 'adm'){
      admLogado = true
    }
    return admLogado
  }
}
