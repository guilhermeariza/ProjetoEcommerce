import { AlertaService } from 'src/app/service/alerta.service';
import { CarrinhoService } from 'src/app/service/carrinho.service';
import { Carrinho } from 'src/app/model/Carrinho';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-finalizar-carrinho',
  templateUrl: './finalizar-carrinho.component.html',
  styleUrls: ['./finalizar-carrinho.component.css']
})
export class FinalizarCarrinhoComponent implements OnInit {
  carrinho:Carrinho = new Carrinho()
  usuario: Usuario = new Usuario()
  listaCarrinho: any
  lista: any = new Carrinho()

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {

  }

  finalizarPedido(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
      this.listaCarrinho = this.usuario.carrinho
      console.log(this.listaCarrinho)
      for(this.carrinho of this.listaCarrinho){
        this.carrinho.status = "pedido"
        this.carrinhoService.update(this.carrinho).subscribe((resp: Carrinho)=>{
          this.carrinho = resp
          this.alerta.showAlertSuccess('Pedido finalizado com sucesso')
        }
        )
      }
    })
  }

}
