import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cadastro-adm',
  templateUrl: './cadastro-adm.component.html',
  styleUrls: ['./cadastro-adm.component.css']
})
export class CadastroAdmComponent implements OnInit {
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
      this.usuario.tipo = 'adm'
      this.usuario.nomeFantasia = 'Elertech'
      this.usuario.razaoSocial = 'Elertech energia renovável'
      this.usuario.cnpj = '40.639.880/0001-65'
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso')
        this.router.navigate(['/login'])
      }
      )
    }
  }
}
