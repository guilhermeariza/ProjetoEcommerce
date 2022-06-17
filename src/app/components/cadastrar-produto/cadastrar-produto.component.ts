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

  produto: Produto = new Produto
  listaProdutos: Produto[]

  constructor(private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(){
     return this.produtoService.getAll();
  }

  cadastrarProduto(){
    this.produtoService.save(this.produto).subscribe((resposta: Produto) => {
      this.produto = resposta
      alert('Produto cadastrado com sucesso')
      this.produto = new Produto
    })
  }

  editarProduto(produto: Produto){
    $('#idProdutoEditar').text(this.produto.id)
    $('#nomeProdutoEditar').val(this.produto.nome)
    $('#precoProdutoEditar').val(this.produto.preco)
    $('#qtdProdutoEditar').val(this.produto.quantidade)
    $('#descricaoProdutoEditar').val(this.produto.descricao)
    $("#categoriaProdutoEditar option:contains("+this.produto.categoria+")").attr('selected', 'true');
    $('#fotoProdutoEditar').attr('src', this.produto.foto)
    this.produtoService.update(produto)
  }

  excluirProduto(id: number){
    $('#idProdutoExcluir').text(this.produto.id)
    $('#nomeProdutoExcluir').text(this.produto.nome)
    this.produtoService.delete(id)
  }

  carregarFoto(event: Event) {
    var file: any
    if(file !== null){
      file = document.getElementById('input_img');
      var form = new FormData();
      form.append("image", file.files[0]);
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
          console.log(response);
          var jx = JSON.parse(response);
          var linkFoto = jx.data.url;
          $('#setFoto').attr('src',linkFoto)
          $('#input_img').hide()
      });
    }
  }

  limparImagem(){
    $('#input_img').show()
    $('#setFoto').attr('src','')
  }

  alerta(){
    alert('esta funcionando')
  }
}
