import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Carrinho } from '../model/Carrinho';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<Carrinho[]>{
    return this.http.get<Carrinho[]>(environment.url+'/carrinho', this.token)
  }

  getById(id: number){
    return this.http.get<Carrinho>(environment.url+'/carrinho/'+ id, this.token)
  }

  getByStatus(status: string){
    return this.http.get<Carrinho>(environment.url+'/carrinho/'+status, this.token)
  }

  save(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.post<Carrinho>(environment.url+'/adicionar', carrinho, this.token )
  }

  update(carrinho: Carrinho): Observable<Carrinho>{
    return this.http.put<Carrinho>(environment.url+'/atualizar', carrinho, this.token)
  }

  fazerPedido(carrinho: Carrinho[]): Observable<Carrinho[]>{
    return this.http.put<Carrinho[]>(environment.url+'/carrinho/pedido', carrinho, this.token)
  }

  delete(id: number){
    return this.http.delete<Carrinho>(environment.url+'/'+id, this.token)
  }
}
