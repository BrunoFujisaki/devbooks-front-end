import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILivro } from '../interfaces/ilivro';
import { Observable } from 'rxjs';
import { INovoLivro } from '../interfaces/inovo-livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  URL: string = 'http://localhost:8080/livros';

  constructor(
    private client: HttpClient
  ) { }

  getLivros(): Observable<ILivro[]> {
    return this.client.get<ILivro[]>(this.URL);
  }

  getLivro(id: string): Observable<ILivro> {
    return this.client.get<ILivro>(`${this.URL}/${id}`);
  }

  postLivros(livro: INovoLivro): Observable<ILivro> {
    return this.client.post<ILivro>(this.URL, livro);
  }

  putLivros(livro:INovoLivro): Observable<ILivro> {
    return this.client.put<ILivro>(this.URL, livro);
  }

  deleteLivros(id: string): Observable<void> {
    return this.client.delete<void>(`${this.URL}/${id}`);
  }
}
