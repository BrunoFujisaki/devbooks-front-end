import { Component, OnInit } from '@angular/core';
import { ILivro } from '../../../../interfaces/ilivro';
import { LivroService } from '../../../../services/livro.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lista-livros',
  imports: [CurrencyPipe],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css'
})
export class ListaLivrosComponent implements OnInit {
  livros!: ILivro[];

  constructor(
    private livroService: LivroService
  ) { }

  ngOnInit(): void {
    this.livroService.getLivros().subscribe((livros) => {
      this.livros = livros
    });
  }
}
