import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string) {
    return sessionStorage.setItem(KEY, token);
  }

  excluirToken() {
    sessionStorage.removeItem(KEY);
  }

  retornarToken() {
    return sessionStorage.getItem(KEY) ?? '';
  }

  possuiToken() {
    return !!this.retornarToken();
  }
}
