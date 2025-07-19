import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Usuario {

  id?: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;

}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  buscarPorNome(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar-por-nome?nome=${nome}`);
  }

  login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post('http://localhost:8080/api/usuarios/login', credentials);
  }
  
}
