import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
declare var $:any;

@Component({
  selector: 'app-formulario-dados-cliente',
  templateUrl: './formulario-dados-cliente.component.html',
  styleUrls: ['./formulario-dados-cliente.component.css']
})
export class FormularioDadosClienteComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmarSenha: string
  usuarioAtualizar: any = new Usuario


  constructor(
    private auth :AuthService,
    private router: Router,
    private alerta: AlertaService
    ) { }

  ngOnInit() {
    // window.scroll(0,0)
    this.getUsuario()
    this.mascara()
  }

  mascara(){
    $('#cnpj').inputmask('99.999.999/9999-99')
  }

  getUsuario(){
    this.auth.getById(environment.id).subscribe((data: Usuario)=>{
      this.usuario = data
    })
  }

  confirmSenha(event:any) {
    this.confirmarSenha = event.target.value
  }

  atualizar(){
    this.usuarioAtualizar.nomeFantasia = $('#nomeFantasia').val()
    this.usuarioAtualizar.razaoSocial = $('#razaoSocial').val()
    this.usuarioAtualizar.cnpj = $('#cnpj').val()
    this.usuarioAtualizar.usuario = $('#usuario').val()
    this.usuarioAtualizar.senha = $('#senha').val()
    this.usuarioAtualizar.id = environment.id
    this.usuarioAtualizar.tipo = environment.tipo

    if(this.usuarioAtualizar.senha != this.confirmarSenha){
      this.alerta.showAlertDanger('As senhas precisam ser iguais')
    } else {
      this.auth.update(this.usuarioAtualizar).subscribe((data: Usuario) => {
      this.usuarioAtualizar = data
      this.alerta.showAlertSuccess('Usuário atualizado com sucesso')
      this.usuarioAtualizar = new Usuario
    },
    (error: any) => {
      switch(error.status){
        case 400:
          alert('')
          this.alerta.showAlertDanger('Erro na requisção')
        break;
        case 401:
          this.alerta.showAlertDanger('Acesso não autorizado')
        break;
        case 500:
          this.alerta.showAlertDanger('Erro na aplicação')
        break;
      }
    }
    )
  }
  }
}
