import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from '../main.component';
import { LivroService } from '../../../../services/livro.service';
import { ILivro } from '../../../../interfaces/ilivro';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-livros',
  imports: [RouterLink, MainComponent, CurrencyPipe],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit {
  livros!: ILivro[];
  modalAberto = signal(false);

  constructor(
    private service: LivroService
  ) {}

  ngOnInit(): void {
    this.service.getLivros().subscribe((livros) => {
      this.livros = livros;
    })
  }

  abrirModal() {
    this.modalAberto.set(true);
  }

  excluirLivro(id: string) {
    this.service.deleteLivros(id).subscribe(() => {
      this.livros = this.livros.filter(l => l.id != id);
    })
  }
  
}
