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

  produto:any = new Produto()
  produtoCadastrar: any = new Produto()
  categoria: string

  constructor(private router: Router, private produtoService: ProdutoService) {
    this.carregarTabela()
  }

  ngOnInit(){

  }

  carregarTabela(){
    this.produtoService.getAll().subscribe((data: Produto) => {
        this.produto = data
    },
    (error: any) => {
      console.log('Erro: ', error)
    }
    )
  }

  categoriaProduto(event: any){
    this.categoria = event.target.value
  }

  cadastrarProduto(produtoCadastrar: Produto){
    produtoCadastrar.categoria = this.categoria
    this.produtoService.save(produtoCadastrar).subscribe((resposta: Produto) => {
      produtoCadastrar = resposta
      alert('Produto cadastrado com sucesso')
      this.produtoCadastrar = new Produto
    },
    (error: any) => {
      alert('Preencha todos os campos, são obrigatórios')
    })
    console.log('Produto cadastrado', this.produtoCadastrar)
  }

  abrirModalEditar(produto: Produto){
    console.log(produto)
    $('#idProdutoEditar').text(produto.id)
    $('#nomeProdutoEditar').val(produto.nome)
    $('#precoProdutoEditar').val(produto.preco)
    $('#qtdProdutoEditar').val(produto.estoque)
    $('#descricaoProdutoEditar').val(produto.descricao)
    $("#categoriaProdutoEditar option:contains("+produto.categoria+")").attr('selected', 'true');
    $('#fotoProdutoEditar').attr('src', produto.foto)
  }

  atualizarProduto(produto: Produto){

  }

  abrirModalExcluir(produto: Produto){
    $('#idProdutoExcluir').text(produto.id)
    $('#nomeProdutoExcluir').text(produto.nome)
    console.log(produto)
  }

  excluirProduto(produto: Produto){
    console.log(produto.id)
    let id = produto.id
    this.produtoService.delete(id)
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

  limparImagem(){
    $('#input_img').show()
    $('#input_img').attr('src','')
    $('#setFoto').attr('src','')
  }
}
