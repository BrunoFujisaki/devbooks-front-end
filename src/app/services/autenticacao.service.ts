import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';

interface AuthResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  URL: string = 'http://localhost:8080/auth';

  constructor(
    private client: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  autenticar(email: string, senha: string):
  Observable<HttpResponse<AuthResponse>> {
    return this.client.post<AuthResponse>(`${this.URL}/login`,
      { email, senha },
      { observe: 'response'}).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';
        console.log("Token: "+authToken);   
        this.usuarioService.salvarToken(authToken);
      })
    );
  }
}
