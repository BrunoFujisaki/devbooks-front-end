import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { Observable } from 'rxjs';

interface IRegistro {
  nome: string,
  email: string,
  senha: string
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  URL: string = 'http://localhost:8080/auth';

  constructor(private client: HttpClient) { }

  registrarUsuario(usuario: IRegistro):Observable<IUsuario> {
    return this.client.post<IUsuario>(`${this.URL}/cadastro`, usuario);
  }
}
