import { PessoaJuridica } from "./PessoaJuridica"
import { Produto } from "./Produto"

export class Carrinho{
  public id!: number
  public status!: boolean
  public quantidade!: number
  // public produto!: Produto[]
  // public pessoaJuridica!: PessoaJuridica
}
