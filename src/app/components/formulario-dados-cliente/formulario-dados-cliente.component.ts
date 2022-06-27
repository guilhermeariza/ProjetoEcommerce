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

  usuario: any = environment
  confirmarSenha: string
  usuarioAtualizar: any = new Usuario


  constructor(
    private auth :AuthService,
    private router: Router,
    private alerta: AlertaService
    ) { }

  ngOnInit() {
    window.scroll(0,0)

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

    console.log(this.usuarioAtualizar)
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
