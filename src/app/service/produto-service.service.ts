import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produto: Produto[] = [
    {
      id: 1,
      nome: "Carro elétrico",
      preco: "2.795,00",
      quantidade:1000,
      descricao: "carro eletrico na cor preta",
      categoria:"Transporte",
      foto: "assets/img/carro_preto.png",
    },
    {
      id: 2,
      nome: "Bicicleta elétrica",
      categoria:"Transporte",
      quantidade:2000,
      preco: "1,000.00",
      descricao: "carro eletrico na cor azul",
      foto: "assets/img/bicicleta.png"
    },
    {
      id: 3,
      nome: "Painel solar",
      categoria:"Painéis",
      quantidade:3000,
      preco: "3,000.00",
      descricao: "carro eletrico na cor branco",
      foto: "assets/img/painel_solar_1.png"
    },
    {
      id: 4,
      nome: "Painel solar",
      categoria:"Painéis",
      quantidade:4000,
      preco: "4,000.00",
      descricao: "carro eletrico na cor verde",
      foto: "assets/img/painel_solar_2.png"
    },
  ]

  constructor() { }

  getAll(){
    return this.produto
  }
}

