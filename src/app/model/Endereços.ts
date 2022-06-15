import { PessoaJuridica } from "./PessoaJuridica"

export class Endereco{
  public id!: number
  public enderecoCadastro!: string
  public cep !: string
  public status!: boolean
  public pessoaJuridica!: PessoaJuridica
}
