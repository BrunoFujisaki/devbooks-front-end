import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedido } from '../interfaces/ipedido';
import { IEndereco } from '../interfaces/iendereco';

interface IAtualizarPedido {
  id: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  URL: string = 'http://localhost:8080/pedidos';

  constructor(
    private client: HttpClient
  ) { }

  fazerPedido(endereco: IEndereco):Observable<IPedido> {
    return this.client.post<IPedido>(this.URL, endereco);
  }

  getPedido(id: string):Observable<IPedido> {
    return this.client.get<IPedido>(`${this.URL}/${id}`);
  }

  getPedidos():Observable<IPedido[]> {
    return this.client.get<IPedido[]>(this.URL);
  }

  getAllPedidos():Observable<IPedido[]> {
    return this.client.get<IPedido[]>(`${this.URL}/all`);
  }

  atualizarStatusPedido(dados: IAtualizarPedido):Observable<void> {
    return this.client.patch<void>(this.URL, dados);
  }
}
