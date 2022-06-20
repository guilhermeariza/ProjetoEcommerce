import { Carrinho } from "./Carrinho"
import { CartaoCredito } from "./CartaoCredito"
import { Endereco } from "./Endereços"

export class Usuario{
  public id: number
  public usuario: string
  public senha: string
  public tipo: string
  public foto: string
  public cartaoCredito: CartaoCredito[]
  public carrinho: Carrinho[]
  public endereco: Endereco[]
}
