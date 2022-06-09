import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produto: Produto[] = [
    {id: 1, nome: "Carro preto", categoria:"Transporte", quantidade:1000, preco: "1,000.00", descricao: "carro eletrico na cor preta"},
    {id: 2, nome: "Carro azul", categoria:"Transporte", quantidade:2000, preco: "2,000.00", descricao: "carro eletrico na cor azul"},
    {id: 3, nome: "Carro branco", categoria:"Transporte", quantidade:3000, preco: "3,000.00", descricao: "carro eletrico na cor branco"},
    {id: 4, nome: "Carro verde", categoria:"Transporte", quantidade:4000, preco: "4,000.00", descricao: "carro eletrico na cor verde"},
    {id: 5, nome: "Carro bege", categoria:"Transporte", quantidade:5000, preco: "4,000.00", descricao: "carro eletrico na cor verde"},
    {id: 6, nome: "Carro amarelo", categoria:"Transporte", quantidade:6000, preco: "4,000.00", descricao: "carro eletrico na cor verde"}
  ]

  constructor() { }

  getAll(){
    return this.produto
  }
}

