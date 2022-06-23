import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  usuario: Usuario = new Usuario
  usuarioLogin: UsuarioLogin = new UsuarioLogin
  confirmarSenha: string

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

  cadastrar(usuario: Usuario){
    if(usuario.senha != this.confirmarSenha){
      this.alerta.showAlertDanger('As senhas precisam ser iguais')
    } else {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso')
        this.router.navigate(['/login'])
      }
      )
    }
  }
}
