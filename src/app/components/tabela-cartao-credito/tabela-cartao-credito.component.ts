import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoCredito } from 'src/app/model/CartaoCredito';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
declare var $:any;

@Component({
  selector: 'app-tabela-cartao-credito',
  templateUrl: './tabela-cartao-credito.component.html',
  styleUrls: ['./tabela-cartao-credito.component.css']
})
export class TabelaCartaoCreditoComponent implements OnInit {

  cartao:CartaoCredito = new CartaoCredito()
  listaCartao: CartaoCredito[]


  constructor(private router: Router, private http:HttpClient, private cartaoService: CartaoCreditoService, private alerta: AlertaService) { }

  ngOnInit() {
    return this.getAll()
  }

  getAll(){
    this.cartaoService.getAll().subscribe((data: CartaoCredito[]) => {
      this.listaCartao = data
    },(error: any)=>{
      console.log('Erro: '+ error)
    })
  }

  cadastrarCartao(){
    this.cartaoService.post(this.cartao).subscribe((data: CartaoCredito) => {
      this.cartao = data
      this.alerta.showAlertSuccess('Cartao cadastrado com sucesso')
      this.limparModal()
      this.cartao = new CartaoCredito
    },
    (error: any) => {
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

  abrirModalExcluir(cartao: CartaoCredito){
    this.cartao = cartao
  }

  excluir(){
    this.cartaoService.delete(this.cartao.id).subscribe(() => {
      this.alerta.showAlertSuccess('Cartao excluído com sucesso')
      this.cartao = new CartaoCredito
      this.fecharModal()
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

  limparModal(){
    $('.modal').find('input:text').val('')
}

  fecharModal(){
    $('.modal').modal('hide')
  }
  // fim
}
