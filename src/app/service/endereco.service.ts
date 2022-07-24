import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../model/Endereços';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  getAll(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(environment.url+'/endereco', this.token)
  }

  save(endereco: Endereco): Observable<Endereco>{
    return this.http.post<Endereco>(environment.url+'/endereco/cadastrar', endereco, this.token)
  }

  update(endereco: Endereco): Observable<Endereco>{
    return this.http.put<Endereco>(environment.url+'/endereco/atualizar', endereco, this.token)
  }

  delete(id: number){
    return this.http.delete<Endereco>(environment.url+'/endereco/'+id, this.token)
  }
}
