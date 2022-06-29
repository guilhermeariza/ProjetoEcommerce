import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin

  constructor(private router: Router, private auth: AuthService, private alerta: AlertaService) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.usuarioLogin).subscribe((resposta: UsuarioLogin) => {
      this.usuarioLogin = resposta
      this.alerta.showAlertSuccess('Bom te ver '+this.usuarioLogin.nomeFantasia+'!')

      environment.id = this.usuarioLogin.id
      environment.usuario = this.usuarioLogin.usuario
      environment.tipo = this.usuarioLogin.tipo
      environment.token = this.usuarioLogin.token
      environment.cnpj = this.usuarioLogin.cnpj
      environment.nomeFantasia = this.usuarioLogin.nomeFantasia
      environment.razaoSocial = this.usuarioLogin.razaoSocial
        if(this.usuarioLogin.foto != ''){
          environment.foto = this.usuarioLogin.foto
        } else if(this.usuarioLogin.foto == null){
          environment.foto = "assets/icon/person-circle.svg"
        }
      this.router.navigate(['/inicio'])
    }, erro => {
        if(erro.status == 500){
          this.alerta.showAlertDanger('Huuum, parece que você ainda não é um cliente!')
        } else if(erro.status == 401){
          this.alerta.showAlertDanger('Usuário ou senha estão incorretos!')
        } else if(erro.status == 404){
          this.alerta.showAlertDanger('Houve um erro no seu login, entre em contato pelos nossos canais de atendimento')
        }
      }
    )
  }

}
