import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
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
    private router: Router
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

    console.log(this.usuarioAtualizar)
    if(this.usuarioAtualizar.senha != this.confirmarSenha){
      alert('As senhas precisam ser iguais')
    } else {
      this.auth.update(this.usuarioAtualizar).subscribe((data: Usuario) => {
      this.usuarioAtualizar = data
      alert('Usuario cadastrado com sucesso')
      this.usuarioAtualizar = new Usuario
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
    }
    )
  }
  }



}
