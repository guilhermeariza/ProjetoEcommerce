import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereços';
import { EnderecoService } from 'src/app/service/endereco.service';
declare var $:any;

@Component({
  selector: 'app-tabela-endereco',
  templateUrl: './tabela-endereco.component.html',
  styleUrls: ['./tabela-endereco.component.css']
})
export class TabelaEnderecoComponent implements OnInit {

  endereco:any = new Endereco
  listaEndereco: any = new Endereco
  enderecoCadastrar:any
  enderecoEditar:any
  enderecoExcluir:any

  constructor(private router: Router, private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.enderecoService.getAll().subscribe((data: Endereco) => {
      this.listaEndereco = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }

  cadastrar(endereco: Endereco){
    console.log(endereco)
    this.enderecoService.save(endereco).subscribe((data: Endereco) => {
      this.endereco = data
      alert('Endereco cadastrado com sucesso')
      this.endereco = new Endereco
      this.limparModal
    },
    (error: any) => {
      switch(error.status){
        case 400:
          alert('Erro na requisção')
          console.log('Resposta: '+error.status)
        break;
        case 401:
          alert('Acesso não autorizado')
          console.log('Resposta: '+error.status)
        break;
        case 500:
          alert('Erro na aplicação')
          console.log('Resposta: '+error.status)
        break;
      }
    })
  }

  abrirModalEditar(endereco: Endereco){
    this.enderecoEditar = endereco
  }

  atualizar(enderecoEditar: Endereco){
    this.enderecoService.update(enderecoEditar).subscribe(() => {
      alert('Endereco atualizado com sucesso')
      this.enderecoEditar = new Endereco
      this.limparModal()
      this.fecharModal()
    },
    (error: any) => {
      switch(error.status){
        case 400:
          alert('Erro na requisção')
          console.log('Resposta: '+error.status)
        break;
        case 401:
          alert('Acesso não autorizado')
          console.log('Resposta: '+error.status)
        break;
        case 500:
          alert('Erro na aplicação')
          console.log('Resposta: '+error.status)
        break;
      }
    })
  }

  abrirModalExcluir(endereco: Endereco){
    this.enderecoExcluir = endereco
}

excluir(enderecoExcluir: Endereco){
    this.enderecoService.delete(enderecoExcluir).subscribe(() => {
      alert('Endereco excluído com sucesso')
      enderecoExcluir = new Endereco
      this.fecharModal()
    },
    (error: any) => {switch(error.status){
      case 400:
        alert('Erro na requisição')
        console.log('Resposta: '+error.status)
      break;
      case 401:
        alert('Acesso não autorizado')
        console.log('Resposta: '+error.status)
      break;
      case 500:
        alert('Erro na aplicação')
        console.log('Resposta: '+error.status)
      break;
    }
    })
}


  limparModal(){
    $('.modal').find('input:text').val('')
  }

  fecharModal(){
    $('.modal').modal('hide')
  }
// fim
}
