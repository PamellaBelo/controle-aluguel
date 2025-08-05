import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Propriedade } from "../models/propriedade.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PropriedadeService {
    private apiUrl = 'https://seu-backend.com/api/propriedades';
  
    constructor(private http: HttpClient) {}
  
    getPropriedades(): Observable<Propriedade[]> {
      return this.http.get<Propriedade[]>(this.apiUrl);
    }

    getPropriedadeById(id: string): Observable<Propriedade> {
      return this.http.get<Propriedade>(`${this.apiUrl}/${id}`);
    }
  
    criarPropriedade(propriedade: Propriedade): Observable<Propriedade> {
      return this.http.post<Propriedade>(this.apiUrl, propriedade);
    }
  
    atualizarPropriedade(id: string, propriedade: Propriedade): Observable<Propriedade> {
      return this.http.put<Propriedade>(`${this.apiUrl}/${id}`, propriedade);
    }
  
    deletarPropriedade(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }