import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEndereco } from '../interfaces/iendereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  URL: string = 'https://viacep.com.br/ws/'

  constructor(private client: HttpClient) { }

  getEndereco(cep: string):Observable<IEndereco> {
    return this.client.get<IEndereco>(`${this.URL}${cep}/json`);
  }
}
