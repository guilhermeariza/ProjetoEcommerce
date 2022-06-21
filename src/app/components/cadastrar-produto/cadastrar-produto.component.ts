import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto:any = new Produto
  listaProdutos: any = new Produto
  produtoCadastrar: any
  produtoEditar: any
  produtoExcluir: any
  categoria: string

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    ) {
  }

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.produtoService.getAll().subscribe((data: Produto) => {
      this.listaProdutos = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }

  categoriaProduto(event: any){
    this.categoria = event.target.value
  }

  cadastrarProduto(produto: Produto){
    this.produto.categoria = this.categoria
    this.produto.foto = $('#setFoto').attr('src')
    this.produtoService.save(produto).subscribe((data: Produto) => {
      this.produto = data
      alert('Produto cadastrado com sucesso')
      this.produto = new Produto
      this.limparModal()
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

  abrirModalEditar(produto: Produto){
    this.produtoEditar = produto
    $("#categoriaEditar option:contains("+produto.categoria+")").attr('selected', 'true');
  }

  atualizarProduto(produtoEditar: Produto){
    produtoEditar.id = $('#idEditar').val()
    produtoEditar.nome = $('#nomeEditar').val()
    produtoEditar.preco = $('#precoEditar').val()
    produtoEditar.estoque = $('#precoEditar').val()
    produtoEditar.descricao = $('#descricaoEditar').val()
    produtoEditar.categoria = $('#categoriaEditar').val()
    produtoEditar.foto = $('#fotoProdutoEditar').attr('src')

    this.produtoService.update(produtoEditar).subscribe(() => {
      alert('Produto atualizado com sucesso')
      this.produtoEditar = new Produto
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

  abrirModalExcluir(produto: Produto){
      this.produtoExcluir = produto
  }

  excluirProduto(produtoExcluir: Produto){
      this.produtoService.delete(produtoExcluir).subscribe(() => {
        alert('Produto excluído com sucesso')
        produtoExcluir = new Produto
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

  carregarFoto(event: Event) {
    var file: any
    if(file !== null){
      file = document.getElementById('input_img')
      var form = new FormData()
      form.append("image", file.files[0])
      var settings= new Array
      settings = [{
          url: "https://api.imgbb.com/1/upload?key=f7dc66d97778642fac1278cb89831b02",
          method: "POST",
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form
      }]
      $.ajax(settings[0]).done(function (response: any) {
          console.log(response)
          var jx = JSON.parse(response)
          var linkFoto = jx.data.url
          $('#setFoto').attr('src', linkFoto)
          $('#setFotoInput').val(linkFoto)
          $('#input_img').hide()
        });
    }
  }


  limparModal(){
    $('.modal').find('input:text').val('')
    $('#setFoto').attr('src', '')
    $("#categoriaEditar option:contains(Selecione uma categoria...)").attr('selected', 'true')
    $('input[type="file"]').val('')
    $('#input_img').show()
}

}
