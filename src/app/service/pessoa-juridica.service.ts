import { Injectable } from '@angular/core';
import { PessoaJuridica } from '../model/PessoaJuridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {
  pessoaJuridica: PessoaJuridica[] = [
    {
       id: 1,
       nomeFantasia: 'nomeFantasia1',
       razaoSocial: 'razaoSocial1',
       email: 'email1',
       cnpj: '111.111.111.111',
       cartaoCredito: [
        {
          id: 1,
          apelido: 'Cartao 1',
          nomeCartao: 'Vinicius Campanholi',
          numeroCartao: '4319771301916890',
          dataValidade: '18/02/2025',
          cvv: '101'
        },{
          id: 2,
          apelido: 'Cartao 2',
          nomeCartao: 'Guilherme Ariza',
          numeroCartao: '4969722216061572',
          dataValidade: '11/12/2026',
          cvv: '538'
        }
       ]
    }
  ]
  constructor() { }

  getAll(){
    return this.pessoaJuridica
  }
}
