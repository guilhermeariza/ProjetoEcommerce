import { Carrinho } from "./Carrinho"
import { CartaoCredito } from "./CartaoCredito"
import { Endereco } from "./Endereços"
import { Usuario } from "./Usuario"

export class PessoaJuridica{
  public id!: number
  public nomeFantasia!: string
  public razaoSocial!: string
  public email!: string
  public cnpj!: string
  // public usuario!: Usuario
  public cartaoCredito!: CartaoCredito[]
  // public carrinho!: Carrinho
  // public endereco!: Endereco[]
}
