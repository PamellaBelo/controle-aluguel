import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Unidade } from "../models/unidade.model";

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  private apiUrl = 'http://localhost:8080/api/unidades';

  constructor(private http: HttpClient) {}

  getUnidades(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.apiUrl);
  }

  getUnidadeById(id: number): Observable<Unidade> {
    return this.http.get<Unidade>(`${this.apiUrl}/${id}`);
  }

  criarUnidade(propriedadeId: number, unidade: Unidade): Observable<Unidade> {
    return this.http.post<Unidade>(`${this.apiUrl}/${propriedadeId}`, unidade);
  }

  atualizarUnidade(id: number, unidade: Unidade): Observable<Unidade> {
    return this.http.put<Unidade>(`${this.apiUrl}/${id}`, unidade);
  }
  
  deletarUnidade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
