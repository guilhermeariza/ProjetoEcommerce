import { Carrinho } from "./Carrinho"
import { Categoria } from "./Categoria"

export class Produto {
  public id: number
  public nome: string
  public preco: number
  public estoque: number
  public descricao: string
  public categoria: Categoria
  public foto: string
  public carrinho: Carrinho[]
}
