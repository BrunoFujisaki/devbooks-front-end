import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IEstatisticas {
  totalDeVendas: number,
  totalDeLivros: number,
  totalDeUsuarios: number
}

@Injectable({
  providedIn: 'root'
})
export class EstatisticasService {

  URL: string = 'http://localhost:8080/estatisticas';

  constructor(private client: HttpClient) { }

  getEstatisticas():Observable<IEstatisticas> {
    return this.client.get<IEstatisticas>(this.URL);
  }
}
