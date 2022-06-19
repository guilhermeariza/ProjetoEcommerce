import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CartaoCredito } from '../model/CartaoCredito';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  url: string = 'http://localhost/cartaocredito'

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<CartaoCredito>{
    return this.http.get<CartaoCredito>(this.url)
  }

  delete(cartaoCredito: CartaoCredito):Observable<CartaoCredito>{
    return this.http.delete<CartaoCredito>(this.url +'/'+ cartaoCredito.id, this.token)
  }
}
