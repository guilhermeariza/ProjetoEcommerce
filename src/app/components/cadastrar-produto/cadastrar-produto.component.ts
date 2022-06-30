import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/Categoria';
declare var $:any;

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  produto:Produto = new Produto()
  listaProdutos: Produto[]
  categoriaChange: string

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alerta: AlertaService
    ) {
  }

  ngOnInit(){
    this.getAllProduto()
    this.getAllCategoria()
  }

  getAllProduto(){
    this.produtoService.getAll().subscribe((data: Produto[]) => {
      this.listaProdutos = data
    })
  }

  categoriaProduto(event: any){
    let id = event.target.value
    this.categoriaService.getById(id).subscribe((data: Categoria)=>{
      this.categoria = data
    })
  }

  cadastrarProduto(){
    this.produto.categoria = this.categoria
    this.produto.foto = $('#setFoto').attr('src')
    this.produtoService.save(this.produto).subscribe((data: Produto) => {
      this.produto = data
      this.alerta.showAlertSuccess(`Produto ${this.produto.nome} cadastrado com sucesso`)
      this.produto = new Produto()
      this.limparModal()
      this.getAllProduto()

      this.getAllCategoria()
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

  abrirModalEditar(produto: Produto){
    this.produto = produto
    $("#categoriaProdutoEditar option:contains("+this.produto.categoria.nomeCategoria+")").attr('selected', 'true');
    let id = this.produto.categoria.id
    this.categoriaService.getById(id).subscribe((data: Categoria)=>{
      this.categoria = data
    })
  }

  atualizarProduto(){
    this.produto.categoria = this.categoria
    this.produto.id = $('#idEditar').val()
    this.produto.nome = $('#nomeEditar').val()
    this.produto.preco = $('#precoEditar').val()
    this.produto.estoque = $('#estoqueEditar').val()
    this.produto.descricao = $('#descricaoEditar').val()
    this.produto.foto = $('#fotoProdutoEditar').attr('src')
    this.produtoService.update(this.produto).subscribe((data: Produto) => {
      this.produto = data
      this.alerta.showAlertSuccess('Produto atualizado com sucesso')
      this.produto = new Produto()
      this.getAllProduto()
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

  abrirModalExcluir(produto: Produto){
      this.produto = produto
  }

  excluirProduto() {
      this.produtoService.delete(this.produto.id).subscribe(() => {
        this.alerta.showAlertSuccess(this.produto.nome +' excluído com sucesso')
        this.produto = new Produto()
        this.getAllProduto()
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


  //Gestão de categorias
  getAllCategoria(){
    return this.categoriaService.getAll().subscribe((data: Categoria[])=>{
      this.listaCategoria = data
    })
  }

  getCategoriaById(){
    this.categoriaService.getById(this.categoria.id).subscribe((data: Categoria)=>{
      this.categoria = data
      this.categoria = new Categoria()
    })
  }

  cadastrarCategoria(){
    
    this.categoriaService.save(this.categoria).subscribe((data: Categoria)=>{
      this.categoria = data
      $('#categoriaCadastrar').val('')
      this.alerta.showAlertSuccess(`Categoria ${this.categoria.nomeCategoria} cadastrada com sucesso`)
      this.categoria = new Categoria()
      this.getAllCategoria()
    },(error: any) => {
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

  abrirModalAtualizarCategoria(categoria: Categoria){
    this.categoria = categoria
  }

  atualizarCategoria(){
    this.categoriaService.update(this.categoria).subscribe((data: Categoria)=>{
      this.categoria = data
      this.categoria = new Categoria()
      this.alerta.showAlertSuccess(`Categoria atualizada com sucesso`)
      this.getAllCategoria()

    },(error: any) => {
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

}
