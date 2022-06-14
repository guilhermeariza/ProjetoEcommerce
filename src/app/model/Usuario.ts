import { PessoaJuridica } from "./PessoaJuridica"

export class Usuario{
  public id!: number
  public usuario!: string
  public senha!: string
  public tipo!: string
  public pessoaJuridica!: PessoaJuridica
}
