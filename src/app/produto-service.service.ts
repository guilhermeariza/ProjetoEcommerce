import { Injectable } from '@angular/core';
import { Produto } from './model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produto: Produto[] = [
    {id: 1, nome: "Carro preto", preco: "1,000.00", descricao: "carro eletrico na cor preta"},
    {id: 2, nome: "Carro azul", preco: "2,000.00", descricao: "carro eletrico na cor azul"},
    {id: 3, nome: "Carro branco", preco: "3,000.00", descricao: "carro eletrico na cor branco"},
    {id: 4, nome: "Carro verde", preco: "4,000.00", descricao: "carro eletrico na cor verde"},
    {id: 5, nome: "Carro bege", preco: "4,000.00", descricao: "carro eletrico na cor verde"},
    {id: 6, nome: "Carro amarelo", preco: "4,000.00", descricao: "carro eletrico na cor verde"}


  ]

  constructor() { }

  getAll(){
    return this.produto
  }
}

