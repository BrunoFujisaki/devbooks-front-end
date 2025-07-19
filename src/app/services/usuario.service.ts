import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { HttpClient } from '@angular/common/http';

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
  
  URL: string = 'http://localhost:8080/usuarios';
  private userSubject = new BehaviorSubject<IUsuario | null>(null);

  constructor(
    private client: HttpClient,
    private tokenService: TokenService
  ) { 
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
      role: decodedPayload.role,
      endereco: null
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

  transformarToken() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode<JwtPayload>(token) as IUsuario;
    return user;
  }

  hasPermission(role: string) {
    const user = this.transformarToken();
    return user.role === role ? true : false;
  }

  getUsuario():Observable<IUsuario> {
    const user = this.transformarToken();
    return this.client.get<IUsuario>(`${this.URL}/${user.id}`);
  }

  putUsuario(usuario: IUsuario) {
    return this.client.put(this.URL, usuario);
  }

  getUsuarios():Observable<IUsuario[]> {
    return this.client.get<IUsuario[]>(this.URL);
  }

}
