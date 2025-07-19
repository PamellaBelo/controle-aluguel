import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cadastro {
  private apiUrl = 'http://localhost:3000/api/usuarios'; //trocar pelo do backend 

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}
