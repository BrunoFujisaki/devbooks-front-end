import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/iusuario';

interface DadosCadastro {
  nome: string,
  email: string,
  telefone: string,
  senha: string
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  URL: string = 'http://localhost:8080/auth/cadastro';

  constructor(private client: HttpClient) { }

  cadastrarUsuario(dadosCadastro: DadosCadastro):Observable<IUsuario> {
    return this.client.post<IUsuario>(this.URL, dadosCadastro);
  }
}
