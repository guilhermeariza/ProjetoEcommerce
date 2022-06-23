import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './service/auth.service';
import { PrimeNGConfig } from 'primeng/api';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Elertech';

  constructor(public auth: AuthService, private router: Router, private primengConfig: PrimeNGConfig){

  }

  ngOnInit(){
    this.navegarParaLogin()
    this.primengConfig.ripple = true;
  }

  navegarParaLogin(){
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }
  }
}
