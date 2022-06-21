import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario = environment.usuario
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  sair(){
    this.router.navigate(['/login'])
    environment.token = ''
    environment.usuario = ''
    environment.id = 0
  }

  admLogado(){
    let admLogado: boolean = false
    if(environment.tipo == 'adm'){
      admLogado = true
    }
    return admLogado
  }
}
