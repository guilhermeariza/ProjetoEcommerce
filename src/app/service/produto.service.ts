import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getAll(){
    return this.http.get<Produto>('http/localhost:8080/produto')
  }

  getById(id: number): Observable<Produto>{
    return this.http.get<Produto>('http/localhost:8080/produto/'+ id)
  }

  save(produto: Produto):Observable<Produto>{
    return this.http.post<Produto>('http/localhost:8080/produto', produto, this.token)
  }

  update(produto:Produto):Observable<Produto>{
    return this.http.put<Produto>('http/localhost:8080/produto', produto)
  }

  delete(id: number){
    return this.http.delete<Produto>('http/localhost:8080/produto/'+ id)
  }

}

