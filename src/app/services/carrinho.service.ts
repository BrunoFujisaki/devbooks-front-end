import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarrinho } from '../interfaces/icarrinho';

interface DadosAdicionarAoCarrinho {
  livroId: string,
  quantidade: number
}

interface CarrinhoItemId {
  carrinhoId: string,
  livroId: string
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  URL: string = 'http://localhost:8080/carrinhos';

  constructor(
    private client: HttpClient
  ) { }

  adicionarAoCarrinho(dadosAdicionarAoCarrinho: DadosAdicionarAoCarrinho) {
    return this.client.post(this.URL, dadosAdicionarAoCarrinho)
  }

  getCarrinho(id: string):Observable<ICarrinho> {
    return this.client.get<ICarrinho>(`${this.URL}/${id}`);
  }

  getItens():Observable<ICarrinho> {
    return this.client.get<ICarrinho>(this.URL);
  }

  removerQuantidadeDoItem(carrinhoItemId: CarrinhoItemId) {
    return this.client.patch(this.URL, carrinhoItemId);
  }

  removerItemDoCarrinho(carrinhoItemId: CarrinhoItemId):Observable<void> {
    return this.client.delete<void>(this.URL, {
      body: carrinhoItemId
    });
  }
}
