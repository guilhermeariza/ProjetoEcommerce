import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PessoaJuridica } from '../model/PessoaJuridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {
  url = 'http://localhost:8080/pessoajuridica'
  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Autorization', environment.token)
  }

  public getAll(): Observable<PessoaJuridica> {
    return this.http.get<PessoaJuridica>(this.url)
  }

  getById(id: number): Observable<PessoaJuridica>{
    return this.http.get<PessoaJuridica>(this.url +'/'+ id)
  }

  save(pessoaJuridica: PessoaJuridica):Observable<PessoaJuridica>{
    return this.http.post<PessoaJuridica>(this.url , PessoaJuridica, this.token)
  }

  update(pessoaJuridica:PessoaJuridica):Observable<PessoaJuridica>{
    return this.http.put<PessoaJuridica>(this.url +'/', PessoaJuridica, this.token)
  }

  delete(pessoaJuridica: PessoaJuridica){
    return this.http.delete<PessoaJuridica>(this.url +'/'+ pessoaJuridica.id, this.token)
  }

}


