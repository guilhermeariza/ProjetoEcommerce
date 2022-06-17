import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resposta: UsuarioLogin) => {
      this.usuarioLogin = resposta
      environment.id = this.usuarioLogin.id
      environment.usuario = this.usuarioLogin.usuario
      environment.tipo = this.usuarioLogin.tipo
      environment.token = this.usuarioLogin.token

      console.log(environment.id)
      console.log(environment.usuario)
      console.log(environment.tipo)
      console.log(environment.token)

      this.router.navigate(['/inicio'])
    }, erro => {
        if(erro.status == 500){
          alert('Usuario ou senha incorretos')
        } else if(erro.status == 401){
          alert('Usuario não autorizado')
        } else if(erro.status == 404){
          alert('Usuario não cadastrado')
        }
      }
    )
  }

}
