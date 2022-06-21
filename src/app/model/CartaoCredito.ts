import { Usuario } from "./Usuario"

export class CartaoCredito{
  public id: number
  public apelido: string
  public nomeCartao: string
  public numeroCartao: string
  public dataValidade: string
  public cvv: string
  public usuario: Usuario
}
