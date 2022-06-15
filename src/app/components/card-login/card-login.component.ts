import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
