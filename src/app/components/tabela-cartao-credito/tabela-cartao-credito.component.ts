import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaoCredito } from 'src/app/model/CartaoCredito';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartaoCreditoService } from 'src/app/service/cartao-credito.service';
import { environment } from 'src/environments/environment.prod';
import * as Inputmask from "inputmask"
declare var $:any;

@Component({
  selector: 'app-tabela-cartao-credito',
  templateUrl: './tabela-cartao-credito.component.html',
  styleUrls: ['./tabela-cartao-credito.component.css']
})
export class TabelaCartaoCreditoComponent implements OnInit {

  cartao:CartaoCredito = new CartaoCredito()
  listaCartao: CartaoCredito[]
  usuario: Usuario = new Usuario()

  constructor(private router: Router,
    private http:HttpClient,
    private cartaoService: CartaoCreditoService,
    private alerta: AlertaService,
    private auth: AuthService) { }

  ngOnInit() {
    // Inicializa o componente chamando este método, que busca no banco de dados o usuario logado
    this.getAllCartaoUsuario()
    this.mascara()
  }

  // Metodo para buscar usuario logado no banco de dados, e buscar os cartões desse usuario específico
    getAllCartaoUsuario(){
    this.auth.getById(environment.id).subscribe((data: Usuario) => {
      this.usuario = data
      this.listaCartao = this.usuario.cartaoCredito
    })
  }

  mascara(){
    $('#numeroCartaoCadastrar').inputmask('9999.9999.9999.9999')
    $('#validadeCadastrar').inputmask('99/99')
    $('#cvvCadastrar').inputmask('999')
  }

  cadastrarCartao(){
    // Armzena no atributo usuario do CartaoCredito, o usuario logado que foi buscado pelo metodo getAllCartaoUsuario
    this.cartao.usuario = this.usuario
    this.cartao.nomeCartao = $('#nomeCartaoCadastrar').val()
    this.cartao.nomeCartao = this.cartao.nomeCartao.toUpperCase()
    this.cartao.numeroCartao = $('#numeroCartaoCadastrar').val()
    this.cartao.dataValidade = $('#validadeCadastrar').val()
    this.cartao.cvv = $('#cvvCadastrar').val()
    // Passa o cartão(já com o usuario inserido) para o post da cartaoService
    this.cartaoService.post(this.cartao).subscribe((data: CartaoCredito) => {
      // Armazena o retorno dentro do cartão desta classe
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
