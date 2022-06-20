import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../model/Endereços';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  url: string = 'http://localhost:8080/endereco'

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<Endereco>{
    return this.http.get<Endereco>(this.url)
  }

  save(endereco: Endereco): Observable<Endereco>{
    return this.http.post<Endereco>(this.url+'/cadastrar', endereco, this.token )
  }

  update(endereco: Endereco): Observable<Endereco>{
    return this.http.put<Endereco>(this.url, endereco, this.token)
  }

  delete(endereco: Endereco){
    return this.http.delete<Endereco>(this.url+'/'+endereco.id, this.token)
  }
}
