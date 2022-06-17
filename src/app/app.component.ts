import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Elertech';

  constructor(public auth: AuthService){

  }
}
