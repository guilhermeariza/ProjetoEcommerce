import { Component, OnInit } from '@angular/core';
import { CardHomeServiceService } from '../card-home-service.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent implements OnInit {

  produto: Produto[]=[]

  constructor(private cardHomeServiceService: CardHomeServiceService) { }

  ngOnInit(){
    this.produto=this.cardHomeServiceService.getAll()
  }

}
