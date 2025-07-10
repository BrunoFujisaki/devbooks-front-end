import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from './usuario.service';

interface AuthResponse {
  token: string
}

interface IDadosLogin {
  email: string,
  senha: string
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  URL: string = 'http://localhost:8080/auth/login';

  constructor(
    private client: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  autenticar(dadosLogin: IDadosLogin):
  Observable<HttpResponse<AuthResponse>> {
    return this.client.post<AuthResponse>(this.URL,
      dadosLogin,
      { observe: 'response'}).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';  
        this.usuarioService.salvarToken(authToken);
      })
    );
  }
}
