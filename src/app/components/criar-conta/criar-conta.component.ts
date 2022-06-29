import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioLogin } from 'src/app/model/UsuarioLogin';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
declare var $:any;

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
    this.mascara()
  }

  mascara(){
    $('#cnpj').inputmask('99.999.999/9999-99')
  }

  confirmSenha(event:any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar(usuario: Usuario){
    if(usuario.senha != this.confirmarSenha){
      this.alerta.showAlertDanger('As senhas precisam ser iguais')
    } else {
      this.usuario.tipo = 'cliente'
      this.usuario.foto = $('#setFoto').attr('src')
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        this.alerta.showAlertSuccess('Usuário cadastrado com sucesso')
        this.router.navigate(['/login'])
      }
      )
    }
  }

  carregarFoto(event: Event) {
    var file: any
    if(file !== null){
      file = document.getElementById('input_img')
      var form = new FormData()
      form.append("image", file.files[0])
      var settings= new Array
      settings = [{
          url: "https://api.imgbb.com/1/upload?key=f7dc66d97778642fac1278cb89831b02",
          method: "POST",
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form
      }]
      $.ajax(settings[0]).done(function (response: any) {
          console.log(response)
          var jx = JSON.parse(response)
          var linkFoto = jx.data.url
          $('#setFoto').attr('src', linkFoto)
          $('#setFotoInput').val(linkFoto)
          $('#input_img').hide()
          $('#enviarFotolabel').hide()
        });
    }
  }
}
