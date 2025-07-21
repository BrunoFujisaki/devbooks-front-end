import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ILivro } from '../../../../interfaces/ilivro';
import { LivroService } from '../../../../services/livro.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-lista-livros',
  imports: [CurrencyPipe, RouterLink, FormsModule, CommonModule],
  templateUrl: './lista-livros.component.html',
  styleUrl: './lista-livros.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListaLivrosComponent implements OnInit {
  livros: ILivro[] = [];
  livrosFiltrados: ILivro[] = [];
  categorias: string[] = [];
  filtroCategoria: string = '';

  constructor(
    private livroService: LivroService,
    private carrinhoService: CarrinhoService,
    private alertaService: AlertaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.livroService.getLivros().subscribe((livros) => {
      this.livros = livros;
      this.livrosFiltrados = livros;
      this.livros.forEach(livro => {
        if (!this.categorias.includes(livro.categoria.nome))
          this.categorias.push(livro.categoria.nome);
      })
    });
  }

  filtrarLivros() {
    if (this.filtroCategoria === '') {
      this.livrosFiltrados = this.livros;
    } else {
      this.livrosFiltrados = this.livros.filter(l => l.categoria.nome === this.filtroCategoria);
    }
  }

  adicionarAoCarrinho(livro: ILivro) {
    if (this.usuarioService.estaLogado()) {
      const dados = {
        livroId: livro.id,
        quantidade: 1
      }
      this.carrinhoService.adicionarAoCarrinho(dados).subscribe({
        next: () => {
          this.alertaService.success(livro.titulo+' adicionado ao carrinho!');
        },
        error: (erro) => {
          this.alertaService.error(erro.status, erro.error?.message)
        }
      });
    } else {
      this.alertaService.error('Faça login para adicionar itens ao seu carrinho', '');
    }
  }
}
