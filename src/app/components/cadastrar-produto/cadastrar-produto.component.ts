import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { Router } from '@angular/router';
import * as $ from 'jQuery';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto:any = new Produto
  produtoCadastrar: any = new Produto
  categoria: string
  listaProdutos: any = new Produto

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    ) {
  }

  ngOnInit(){
    this.carregarTabela()
  }

  carregarTabela(){
    this.produtoService.getAll().subscribe((data: Produto) => {
      this.listaProdutos = data
    },(error: any) => {
      console.log('Erro: ', error)
    })
  }

  categoriaProduto(event: any){
    this.categoria = event.target.value
  }

  cadastrarProduto(produtoCadastrar: Produto){
    console.log(this.produtoCadastrar)
    this.produtoCadastrar.categoria = this.categoria
    this.produtoCadastrar.foto = $('#setFoto').attr('src')
    this.produtoService.save(produtoCadastrar).subscribe((resposta: Produto) => {
      produtoCadastrar = resposta
      alert('Produto cadastrado com sucesso')
      this.produtoCadastrar = new Produto
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
    this.limparModalEditar()
  }

  abrirModalEditar(produto: Produto){
    $('#idEditar').text(produto.id)
    $('#nomeEditar').val(produto.nome)
    $('#precoEditar').val(produto.preco)
    $('#estoqueEditar').val(produto.estoque)
    $('#descricaoEditar').val(produto.descricao)
    $("#categoriaEditar option:contains("+produto.categoria+")").attr('selected', 'true');
    $('#fotoProdutoEditar').attr('src', produto.foto)
  }

  atualizarProduto(){
    this.produto = new Produto
    this.produto.id = $('#idEditar').text()
    this.produto.nome = $('#nomeEditar').val()
    this.produto.preco = $('#precoEditar').val()
    this.produto.estoque = $('#precoEditar').val()
    this.produto.descricao = $('#descricaoEditar').val()
    this.produto.categoria = $('#categoriaEditar').val()
    this.produto.foto = $('#fotoProdutoEditar').attr('src')

    this.produtoService.update(this.produto).subscribe(() => {
      alert('Produto atualizado com sucesso')
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
    $('#idProdutoExcluir').text(produto.id)
    $('#nomeProdutoExcluir').text(produto.nome)
    $('#precoProdutoExcluir').text(produto.preco)
    $('#estoqueProdutoExcluir').text(produto.estoque)
    $('#descricaoProdutoExcluir').text(produto.descricao)
    $('#categoriaProdutoExcluir').text(produto.categoria)
    $('#fotoProdutoExcluir').text(produto.foto)
  }

  excluirProduto(){
    this.produto = new Produto
    this.produto.id = $('#idProdutoExcluir').text()
    this.produto.nome = $('#nomeProdutoExcluir').text()
    this.produto.preco = $('#precoProdutoExcluir').text()
    this.produto.estoque =$('#estoqueProdutoExcluir').text()
    this.produto.descricao = $('#descricaoProdutoExcluir').text()
    this.produto.categoria = $('#categoriaProdutoExcluir').val()
    this.produto.foto = $('#fotoProdutoExcluir').text()

      this.produtoService.delete(this.produto).subscribe(() => {
        alert('Produto excluído com sucesso')
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
      $.ajax(settings[0]).done(function (response) {
          console.log(response)
          var jx = JSON.parse(response)
          var linkFoto = jx.data.url
          $('#setFoto').attr('src', linkFoto)
          $('#setFotoInput').val(linkFoto)
          $('#input_img').hide()
        });
    }
  }

  limparModalEditar(){
    $('#input_img').show()
    $('#input_img').val('')
    $('#setFoto').attr('src','')
    $('#categoriaCadastrar').val(0)
  }
}
