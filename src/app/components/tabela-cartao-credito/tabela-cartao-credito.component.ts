import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoCredito } from 'src/app/model/CartaoCredito';
import { Usuario } from 'src/app/model/Usuario';
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


  constructor(private router: Router, private http:HttpClient, private cartaoService: CartaoCreditoService) { }

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
      alert('Cartao cadastrado com sucesso')
      this.cartao = new CartaoCredito
      this.limparModal()
    },
    (error: any) => {
      switch(error.status){
        case 400:
          alert('Erro na requisção')
          console.log('Resposta: '+error.status)
        break;
        case 401:
          alert('Acesso não autorizado')
          console.log('Resposta: '+error.status)
        break;
        case 500:
          alert('Erro na aplicação')
          console.log('Resposta: '+error.status)
        break;
      }
    })
  }

  abrirModalExcluir(cartao: CartaoCredito){
    this.cartao = cartao
  }

  excluir(){
    this.cartaoService.delete(this.cartao.id).subscribe(() => {
      alert('Cartão excluído com sucesso')
      this.cartao = new CartaoCredito
      this.fecharModal()
    },(error: any) => {
      switch(error.status){
        case 400:
          alert('Erro na requisção')
          console.log('Resposta: '+error.status)
        break;
        case 401:
          alert('Acesso não autorizado')
          console.log('Resposta: '+error.status)
        break;
        case 500:
          alert('Erro na aplicação')
          console.log('Resposta: '+error.status)
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
