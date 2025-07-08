import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoria } from '../interfaces/icategoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  URL: string = 'http://localhost:8080/categorias';

  constructor(private client: HttpClient) { }

  getCategorias(): Observable<ICategoria[]> {
    return this.client.get<ICategoria[]>(this.URL);
  }

  getCategoriaPorId(id: string): Observable<ICategoria> {
    return this.client.get<ICategoria>(`${this.URL}/${id}`);
  }

  postCategoria(categoria: ICategoria): Observable<ICategoria> {
    return this.client.post<ICategoria>(this.URL, categoria);
  }

  putCategoria(categoria: ICategoria): Observable<ICategoria> {
    return this.client.put<ICategoria>(this.URL, categoria);
  }

  deleteCategoria(id: string): Observable<void> {
    return this.client.delete<void>(`${this.URL}/${id}`);
  }
}
