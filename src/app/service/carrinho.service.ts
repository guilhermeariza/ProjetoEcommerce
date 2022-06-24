import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Carrinho } from '../model/Carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  url: string = 'http://localhost:8080/carrinho'

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<Carrinho[]>{
    return this.http.get<Carrinho[]>(this.url, this.token)
  }

  getById(id: number){
    return this.http.get<Carrinho>('http://localhost:8080/carrinho/'+ id, this.token)
  }

  getByStatus(status: string){
    return this.http.get<Carrinho>('http://localhost:8080/carrinho/'+status, this.token)
  }

  save(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.post<Carrinho>(this.url+'/adicionar', carrinho, this.token )
  }

  update(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.put<Carrinho>(this.url+'/atualizar', carrinho, this.token)
  }

  delete(id: number){
    return this.http.delete<Carrinho>(this.url+'/'+id, this.token)
  }
}
