import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8080/produto', this.token)
  }

  getById(id: number){
    return this.http.get<Produto>('http://localhost:8080/produto/'+ id, this.token)
  }

  getbyName(nome: string):Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produto/pesquisar/'+ nome, this.token)
  }

  getbyCategoria(categoria: string):Observable<Produto[]>{
    return this.http.get<Produto[]>('http://localhost:8080/produto/categoria/'+ categoria, this.token)
  }

  save(produto: Produto):Observable<Produto>{
    return this.http.post<Produto>('http://localhost:8080/produto/cadastrar', produto, this.token)
  }

  update(produto:Produto):Observable<Produto>{
    return this.http.put<Produto>('http://localhost:8080/produto/atualizar', produto, this.token)
  }

  delete(id: number){
    return this.http.delete<Produto>('http://localhost:8080/produto/'+ id, this.token)
  }

}

