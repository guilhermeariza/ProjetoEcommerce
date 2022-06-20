import { Produto } from "./Produto"
import { Usuario } from "./Usuario"

export class Carrinho{
  public id: number
  public status: boolean
  public periodoLocacao: number
  public quantidade: number
  public produto: Produto[]
  public usuario: Usuario
}
