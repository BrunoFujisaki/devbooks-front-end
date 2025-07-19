import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ILivro } from '../../../../interfaces/ilivro';
import { LivroService } from '../../../../services/livro.service';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ICategoria } from '../../../../interfaces/icategoria';
import { CategoriaService } from '../../../../services/categoria.service';

@Component({
  selector: 'app-lista-livros',
  imports: [CurrencyPipe, RouterLink, FormsModule],
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
    private usuarioService: UsuarioService
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
      this.carrinhoService.adicionarAoCarrinho(dados).subscribe();
    } else {
      alert('Faça login para adicionar itens ao seu carrinho')
    }
  }
}
