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

  getAll(): Observable<CartaoCredito[]>{
    return this.http.get<CartaoCredito[]>('http://localhost:8080/cartaocredito', this.token)
  }

  post(cartao: CartaoCredito):Observable<CartaoCredito>{
    return this.http.post<CartaoCredito>('http://localhost:8080/cartaocredito/cadastrar', cartao, this.token)
  }

  delete(id: number){
    return this.http.delete('http://localhost:8080/cartaocredito/' + id, this.token)
  }
}
