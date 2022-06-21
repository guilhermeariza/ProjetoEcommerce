import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  url = 'http://localhost:8080/produto'

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll() {
    return this.http.get<Produto>(this.url)
  }

  getById(produto: Produto){
    return this.http.get<Produto>(this.url +'/'+ produto.id)
  }

  getbyName(produto: Produto){
    return this.http.get<Produto>(this.url + '/produto/'+ produto.nome)
  }

  getbyCategoria(produto: Produto){
    return this.http.get<Produto>('http://localhost:8080/produto/categoria/'+ produto.categoria, this.token)
  }

  save(produto: Produto):Observable<Produto>{
    return this.http.post<Produto>(this.url +'/cadastrar', produto, this.token)
  }

  update(produto:Produto):Observable<Produto>{
    return this.http.put<Produto>(this.url +'/cadastrar', produto, this.token)
  }

  delete(produto: Produto){
    return this.http.delete<Produto>(this.url +'/'+ produto.id, this.token)
  }

}

