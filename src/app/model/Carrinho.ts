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
  public data: Data
  public status: string
  public usuario: Usuario

	public endereco: string
	public cep: string

	public apelidoCartao: string
	public nomeCartao: string
	public numeroCartao: string
	public dataValidadeCartao: string
	public cvvCartao: string
}
