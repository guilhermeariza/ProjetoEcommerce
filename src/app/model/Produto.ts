import { Carrinho } from "./Carrinho"

export class Produto {
  public id: number
  public nome: string
  public preco: number
  public estoque: number
  public descricao: string
  public categoria: string
  public foto: string
  public carrinho: Carrinho[]
}
