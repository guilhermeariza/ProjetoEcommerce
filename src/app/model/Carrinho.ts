import { Data } from "popper.js"
import { Usuario } from "./Usuario"

export class Carrinho{
  public id: number
  public nomeProduto: string
  public idProduto: number
  public foto: string
  public descricao: string
  public categoria: string
  public quantidade: number
  public valorUnitario: number
  public valorTotal: number
  public data: string
  public status: string
  public usuario: Usuario

	private endereco: string
	private cep: string

	private apelidoCartao: string
	private nomeCartao: string
	private numeroCartao: string
	private dataValidadeCartao: string
	private cvvCartao: string
}
