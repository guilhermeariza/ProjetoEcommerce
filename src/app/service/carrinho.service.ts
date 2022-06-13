import { Injectable } from '@angular/core';
import { Carrinho } from '../model/Carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  carrinho: Carrinho[]=[
    {
      id:1,
      status:true,
      quantidade:1,
      produto:[{
        id: 1,
        nome: "Carro elétrico",
        preco: "2.795,00",
        quantidade:1000,
        descricao: "carro eletrico na cor preta",
        categoria:"Transporte",
        foto: "assets/img/carro_preto.png"
      }]
    },
    {
      id:1,
      status:true,
      quantidade:2,
      produto:[{
        id: 2,
        nome: "Bicicleta elétrica",
        categoria:"Transporte",
        quantidade:2000,
        preco: "1,000.00",
        descricao: "carro eletrico na cor azul",
        foto: "assets/img/bicicleta.png"
      }]
    },
    {
      id:1,
      status:true,
      quantidade:3,
      produto:[{
        id: 3,
        nome: "Painel solar",
        categoria:"Painéis",
        quantidade:3000,
        preco: "3,000.00",
        descricao: "carro eletrico na cor branco",
        foto: "assets/img/painel_solar_1.png"
      }]
    }
  ]


  constructor() { }

  getAll(){
    return this.carrinho
  }
}
