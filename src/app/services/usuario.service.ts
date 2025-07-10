import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface IJwtPayload {
  iss: string;
  sub: string; 
  id: string;
  nome: string;
  telefone: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private userSubject = new BehaviorSubject<IUsuario | null>(null);

  constructor(private tokenService: TokenService) { 
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const decodedPayload = jwtDecode(token) as IJwtPayload;
    const usuario = {
      email: decodedPayload.sub,
      id: decodedPayload.id,
      nome: decodedPayload.nome,
      telefone: decodedPayload.telefone,
      role: decodedPayload.role
    }
    this.userSubject.next(usuario);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

  hasPermission(role: string) {
    const token = this.tokenService.retornarToken();
    let user = jwtDecode<JwtPayload>(token) as IUsuario;
    console.log(user);
    return user.role === role ? true : false;
  }

}
