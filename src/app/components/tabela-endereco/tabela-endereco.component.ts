import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/model/Endereços';
import { AlertaService } from 'src/app/service/alerta.service';
import { EnderecoService } from 'src/app/service/endereco.service';
declare var $:any;

@Component({
  selector: 'app-tabela-endereco',
  templateUrl: './tabela-endereco.component.html',
  styleUrls: ['./tabela-endereco.component.css']
})
export class TabelaEnderecoComponent implements OnInit {

  endereco: Endereco = new Endereco()
  listaEnderecos: Endereco[]

  constructor(private router: Router, private enderecoService: EnderecoService, private alerta: AlertaService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.enderecoService.getAll().subscribe((data: Endereco[]) => {
      this.listaEnderecos = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }

  cadastrar(){
    this.enderecoService.save(this.endereco).subscribe((data: Endereco) => {
      this.endereco = data
      this.alerta.showAlertSuccess('Endereco cadastrado com sucesso')
      this.endereco = new Endereco()
      this.limparModal
    },
    (error: any) => {
      switch(error.status){
        case 400:
          this.alerta.showAlertDanger('Erro na requisção, erro: '+error.status)
        break;
        case 401:
          this.alerta.showAlertDanger('Acesso não autorizado, erro: '+error.status)
        break;
        case 500:
          this.alerta.showAlertDanger('Erro na aplicação, erro: '+error.status)
        break;
      }
    })
  }

  abrirModalEditar(endereco: Endereco){
    this.endereco = endereco
  }

  atualizar(){
    this.enderecoService.update(this.endereco).subscribe((data: Endereco) => {
      this.endereco = data
      this.alerta.showAlertSuccess('Endereco atualizado com sucesso')
      this.limparModal()
      this.fecharModal()
      this.endereco = new Endereco
    },
    (error: any) => {
      switch(error.status){
        case 400:
          this.alerta.showAlertDanger('Erro na requisção, erro: '+error.status)
        break;
        case 401:
          this.alerta.showAlertDanger('Acesso não autorizado, erro: '+error.status)
        break;
        case 500:
          this.alerta.showAlertDanger('Erro na aplicação, erro: '+error.status)
        break;
      }
    })
  }

  abrirModalExcluir(endereco: Endereco){
    this.endereco = endereco
}

excluir(){
    this.enderecoService.delete(this.endereco.id).subscribe((data: Endereco) => {
      this.endereco = data
      this.alerta.showAlertSuccess('Endereco excluído com sucesso')
      this.endereco = new Endereco
      this.fecharModal()
    },
    (error: any) => {
      switch(error.status){
        case 400:
          this.alerta.showAlertDanger('Erro na requisção, erro: '+error.status)
        break;
        case 401:
          this.alerta.showAlertDanger('Acesso não autorizado, erro: '+error.status)
        break;
        case 500:
          this.alerta.showAlertDanger('Erro na aplicação, erro: '+error.status)
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
