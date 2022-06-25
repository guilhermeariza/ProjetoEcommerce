import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereços';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { EnderecoService } from 'src/app/service/endereco.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-tabela-endereco',
  templateUrl: './tabela-endereco.component.html',
  styleUrls: ['./tabela-endereco.component.css']
})
export class TabelaEnderecoComponent implements OnInit {

  endereco: Endereco = new Endereco()
  listaEnderecos: Endereco[]
  usuario: Usuario = new Usuario()

  constructor(private router: Router,
    private enderecoService: EnderecoService,
    private alerta: AlertaService,
    private auth: AuthService) { }

  ngOnInit(){
    this.getAllEnderecoUsuario()
  }

  getAllEnderecoUsuario(){
    // Obter o usuario logado atraves do método getById da Service de autenticação
    this.auth.getById(environment.id).subscribe((resposta: Usuario)=>{
      // Armazenar a resposta na variavel usuario
      this.usuario = resposta
      // Armazenar o atributo endereco do usuario na variável listaEndereco
      this.listaEnderecos = this.usuario.endereco
    })
  }

  cadastrar(){
    // indicar para o endereco qual usuario deve ser associado
    this.endereco.usuario = this.usuario
    // Passar o endereço, já com o usuario associado, como parametro para o método save da service de endereco
    this.enderecoService.save(this.endereco).subscribe((data: Endereco) => {
      this.endereco = data
      this.alerta.showAlertSuccess('Endereco cadastrado com sucesso')
      this.endereco = new Endereco()
      this.limparModal
      this.ngOnInit()
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

  abrirModalEditar(endereco: Endereco){
    this.endereco = endereco
  }

  atualizar(){
    this.endereco.endereco = $('#enderecoEditar').val()
    this.endereco.cep = $('#cepEditar').val()
    this.endereco.usuario = this.usuario

    this.enderecoService.update(this.endereco).subscribe((data: Endereco) => {
      this.endereco = data
      console.log(this.endereco)
      this.endereco = new Endereco()
      this.alerta.showAlertSuccess('Endereco atualizado com sucesso')
      this.limparModal()
      this.fecharModal()
      this.ngOnInit()
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

  abrirModalExcluir(endereco: Endereco){
    this.endereco = endereco
}

excluir(){
    this.enderecoService.delete(this.endereco.id).subscribe((data: Endereco) => {
      this.endereco = data
      this.alerta.showAlertSuccess('Endereco excluído com sucesso')
      this.endereco = new Endereco
      this.fecharModal()
      this.ngOnInit()
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


  limparModal(){
    $('.modal').find('input').val('')
  }

  fecharModal(){
    $('.modal').modal('hide')
  }
// fim
}
