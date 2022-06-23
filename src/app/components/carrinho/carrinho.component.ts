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
  listaCarrinho:Carrinho[]
  usuario: Usuario = new Usuario()

  constructor(private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService) { }

  ngOnInit(){
    this.getAlCarrinhoUsuario()
  }

  getAlCarrinhoUsuario(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.listaCarrinho = this.usuario.carrinho
    })
  }

  teste(){
    this.carrinho.usuario = this.usuario
    this.carrinhoService.save(this.carrinho).subscribe((data: Carrinho)=>{
      this.carrinho = data
      console.log(this.carrinho)
      this.alerta.showAlertSuccess('Carrinho cadastrado com sucesso')
      this.carrinho = new Carrinho
    })
  }

}
