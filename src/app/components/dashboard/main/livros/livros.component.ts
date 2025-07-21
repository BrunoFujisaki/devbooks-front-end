import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainComponent } from '../main.component';
import { LivroService } from '../../../../services/livro.service';
import { ILivro } from '../../../../interfaces/ilivro';
import { CurrencyPipe } from '@angular/common';
import { AlertaService } from '../../../../services/alerta.service';

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
    private service: LivroService,
    private alertaService: AlertaService
  ) { }

  ngOnInit(): void {
    this.service.getLivros().subscribe((livros) => {
      this.livros = livros;
    })
  }

  abrirModal() {
    this.modalAberto.set(true);
  }

  async excluirLivro(id: string) {
    const confirm = await this.alertaService.warning();
    if (confirm) {
      this.service.deleteLivros(id).subscribe({
        next: () => {
          this.alertaService.success("Livro deletado com sucesso!");
          this.livros = this.livros.filter(l => l.id != id);
        },
        error: (erro) => {
          this.alertaService.error(erro.status, erro.error?.message)
        }
      });
    }
  }

}
