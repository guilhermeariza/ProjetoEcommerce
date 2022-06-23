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

  getAll(): Observable<Carrinho>{
    return this.http.get<Carrinho>(this.url)
  }

  getByIdTema(id: number): Observable<Carrinho>{
    return this.http.get<Carrinho>(this.url)
  }

  postCarrinho(carrinho: Carrinho):Observable<Carrinho>{
    return this.http.post<Carrinho>(this.url +'/cadastrar', carrinho, this.token)
  }

  putCarrinho(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.put<Carrinho>(this.url, carrinho, this.token)
  }

  deleteCarrinho(id: number):Observable<Carrinho>{
    return this.http.delete<Carrinho>(this.url + '/'+ id, this.token)
  }


}
