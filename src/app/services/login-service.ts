import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface LoginResponse{
  token: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  login(name: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, { name, password }).pipe(
      tap(response => {
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.name);
      })
    );
  }



}
