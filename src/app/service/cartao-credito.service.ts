import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CartaoCredito } from '../model/CartaoCredito';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(idUsuario: number): Observable<CartaoCredito[]>{
    return this.http.get<CartaoCredito[]>(`http://localhost:8080/cartaocredito/buscar/user/${idUsuario}`, this.token)
  }

  post(cartao: CartaoCredito, idUsuario: number):Observable<CartaoCredito>{
    return this.http.post<CartaoCredito>(`http://localhost:8080/cartaocredito/cadastrar/user/${idUsuario}`, cartao, this.token)
  }

  delete(id: number){
    return this.http.delete(`http://localhost:8080/cartaocredito/delete/${id}`, this.token)
  }
}
