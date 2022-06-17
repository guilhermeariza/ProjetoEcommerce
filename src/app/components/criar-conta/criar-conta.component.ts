import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  user: Usuario = new Usuario
  userLogin: UsuarioLogin = new UsuarioLogin
  confirmarSenha: string

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


  cadastrar(){

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas precisam ser iguais')
    } else {
      this.auth.cadastrar(this.user).subscribe((resp: Usuario)=>{
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso')
      }
      )
    }
  }
}
