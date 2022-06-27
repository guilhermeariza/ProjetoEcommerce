import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:8080/usuarios'

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  constructor(private http:HttpClient, private router: Router, private alerta: AlertaService) { }

  entrar(usuarioLogin: UsuarioLogin):Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }

  getById(id: number):Observable<Usuario>{
    return this.http.get<Usuario>('http://localhost:8080/usuarios/'+id, this.token)
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.url+'/atualizar', usuario, this.token)
  }

  logado(){
    let usuarioLogado:boolean = false
    if(environment.token != ''){
      usuarioLogado = true
    }
    return usuarioLogado
  }

  sair(){
    this.alerta.showAlertSuccess('Esperamos te ver em breve '+environment.nomeFantasia+'!')
    this.router.navigate(['/login'])
    environment.token = ''
    environment.usuario = ''
    environment.tipo = ''
    environment.id = 0
  }
}
